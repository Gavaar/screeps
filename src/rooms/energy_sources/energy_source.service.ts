import { CreepType } from '@creeps/creep.interface';
import { spawnService } from '@spawns/spawn.service';

class EnergySourceService {
  getRoomEnergySources(room: IRoom): { [id: string]: ISource } {
    let sources = room.memory.sources;
    if (sources) return sources;

    sources = room.memory.sources = this.findEnergySourcesInRoom(room);
    return sources;
  }

  nextEnergySourceInRoom(room: IRoom): string {
    const sources = this.getRoomEnergySources(room);
    const sourceId = Object.keys(sources)
      .sort((sa, sb) => { // order them by lower amount of miners
        return sources[sa].memory.miners - sources[sb].memory.miners;
      })
      .find(srcId => { // return the first that has an empty spot
        return sources[srcId].memory.minerCapacity > sources[srcId].memory.miners;
      });

    if (sourceId) room.memory.sources[sourceId].memory.miners += 1;
    return sourceId || '';
  }

  droppedResources(room: IRoom): IResource[] {
    return room.find<IResource>(FIND_DROPPED_RESOURCES)
      .sort((sa, sb) => sb.amount - sa.amount);
  }

  getPathFromStoresToSources(room: IRoom) {
    const srcPos = Object.values(this.getRoomEnergySources(room)).map(s => s.pos);
    const spawns = spawnService.getSpawnsInRoom(room);
    const paths: IPosition[] = [];

    Object.values(spawns).forEach(sp => {
      srcPos.forEach(_srcPos => {
        paths.push(...room.findPath(sp.pos, _srcPos, { swampCost: 1, ignoreCreeps: true, range: 1 }));
      })
    });

    return paths.map(({ x, y }) => room.getPositionAt(x, y));
  }

  findFreeContainerInSource(src: ISource): IPosition {
    const roomTerr = this.lookAroundSrc(src).find(pos => {
      const { creep, container } = src.room.lookAt(pos.x, pos.y).reduce((t, obj) => {
        if (obj.type === LOOK_CREEPS && obj.creep.type === CreepType.Miner) t.creep = true;
        if ((obj.type === LOOK_STRUCTURES || obj.type === LOOK_CONSTRUCTION_SITES) &&
          obj[obj.type].structureType === STRUCTURE_CONTAINER) {
          t.container = true;
        }
        return t;
      }, { creep: false, container: false });

      return container && !creep;
    });

    if (roomTerr) return src.room.getPositionAt(roomTerr.x, roomTerr.y);

    return {} as IPosition;
  }

  private findEnergySourcesInRoom(room: IRoom) {
    return room.find<ISource>(FIND_SOURCES).reduce((srcMap, src) => {
      src.memory = this.setSourceMemoryConfig(src);
      srcMap[src.id] = src;
      return srcMap;
    }, {} as { [id: string]: ISource })
  }

  private lookAroundSrc(src: ISource): IRoomTerrain[] {
    const { x, y } = src.pos;
    return src.room.lookAtArea(y - 1, x - 1, y + 1, x + 1, true);
  }

  private setSourceMemoryConfig(src: ISource): ISourceMemory {
    let minerCapacity = 0;
    const storagePos: IPosition[] = [];

    this.lookAroundSrc(src).forEach(pos => {
      if (pos.type === 'terrain' && (pos.terrain === 'swamp' || pos.terrain === 'plain')) {
        storagePos.push(src.room.getPositionAt(pos.x, pos.y));
        minerCapacity += 1;
      }
    });

    const optimalMinerCapacity = this.getOptimalMinerPerTick(src, minerCapacity);
    storagePos.length = optimalMinerCapacity;
    storagePos.forEach(pos => {
      src.room.createConstructionSite(pos, STRUCTURE_CONTAINER);
      src.room.createConstructionSite(pos, STRUCTURE_ROAD);
    });

    return { minerCapacity, optimalMinerCapacity, miners: 0 };
  }

  private getOptimalMinerPerTick(src: ISource, capacity: number): number {
    const restoreCooldown = 300; // 300 t
    const energyPerWork = 2; // 2e / w
    const optimalEnergyPerTick = src.energyCapacity / restoreCooldown; // 10e / t
    const harvestSpeed = optimalEnergyPerTick / energyPerWork; // 5w / t
    const workPerMiner = Math.floor((src.room.energyCapacityAvailable - 50) / 100); // 2w / m
    const bestMinerAmount = Math.ceil(harvestSpeed / workPerMiner); // 2.5 m / t =ceil=> 3 m / t

    return capacity < bestMinerAmount ? capacity : bestMinerAmount;
  }
}

const energySourceService = new EnergySourceService();

export { energySourceService };
