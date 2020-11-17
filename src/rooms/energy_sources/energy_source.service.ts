import { structureService } from '@rooms/structures/structure.service';
import { spawnService } from '@spawns/spawn.service';

class EnergySourceService {
  getRoomEnergySources(room: IRoom): { [id: string]: ISource } {
    let sources = room.memory.sources;
    if (sources) return sources;

    sources = room.memory.sources = this.findEnergySourcesInRoom(room);
    return sources;
  }

  getNextEnergySourceInRoom(room: IRoom): string {
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

  getPathFromStoresToSources(room: IRoom) {
    const srcPos = Object.values(this.getRoomEnergySources(room)).map(s => ({ pos: s.pos, range: 1 }));
    const spawns = spawnService.getSpawnsInRoom(room);
    const paths: IPosition[] = [];

    Object.values(spawns).forEach(s => {
      srcPos.forEach(pos => {
        paths.push(...PathFinder.search(s.pos, [pos], { swampCost: 1 }).path);
      })
    });

    return paths;
  }

  findFreeContainerInSource(src: ISource): IPosition{
    const roomTerr = this.lookAroundSrc(src).find(pos => {
      const { creep, container } = src.room.lookAt(pos.x, pos.y).reduce((t, obj) => {
        if (obj.type === LOOK_CREEPS) t.creep = true;
        if ((obj.type === LOOK_STRUCTURES || obj.type === LOOK_CONSTRUCTION_SITES) &&
          obj[obj.type].structureType === STRUCTURE_CONTAINER) {
          t.container = true;
        }
        return t;
      }, { creep: false, container: false });

      return container && !creep;
    });

    if (roomTerr) return src.room.getPositionAt(roomTerr.x, roomTerr.y);

    return src.pos;
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

    const optimalMinerCapacity = this.getOptimalWorkPerCreep(src, minerCapacity);
    storagePos.length = Math.ceil(optimalMinerCapacity);
    storagePos.forEach(pos => structureService.setStorageSite(src.room, pos));

    return { minerCapacity, optimalMinerCapacity, miners: 0 };
  }

  private getOptimalWorkPerCreep(src: ISource, capacity: number): number {
    const restoreCooldown = 300;
    const harvestPerWork = 2;
    const energyPerTick = src.energyCapacity / restoreCooldown; // 10
    const worksPerTick = energyPerTick / harvestPerWork; // 5
    const minerWorkCapacity = Math.floor((src.room.energyCapacityAvailable - 50) / 100);
    const bestMinerAmount = worksPerTick / minerWorkCapacity; // 2

    return capacity < bestMinerAmount ? capacity : bestMinerAmount;
  }
}

const energySourceService = new EnergySourceService();

export { energySourceService };
