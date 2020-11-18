import { IGame } from 'src/types/game';
import { RequiredCreeps } from '@creeps/creep.interface';
import { energySourceService } from './energy_sources/energy_source.service';
import { structureService } from './structures/structure.service';
import { spawnService } from '@spawns/spawn.service';

class RoomService {
  getRooms(): IGame['rooms'] {
    if (!Memory.rooms) Memory.rooms = {};
    return Game.rooms;
  }

  getCreepCapacity(room: IRoom): RequiredCreeps {
    if (room.memory.creepCapacity) return room.memory.creepCapacity;

    room.memory.currentCreeps = { miner: 0, collector: 0, builder: 0, upgrader: 0 }

    const miner = this.calculateMinersNeeded(room);
    const collector = miner;
    const builder = miner * 2;
    const upgrader = room.controller.level;

    room.memory.creepCapacity = { miner, collector, builder, upgrader }
    return room.memory.creepCapacity;
  }

  getRoomStorages(room: IRoom): (ISpawn | IContainer)[] {
    return room.find<ISpawn | IContainer>(FIND_MY_STRUCTURES)
      .filter(s => s.store)
      .sort((sa, sb) => sb.store.getFreeCapacity() - sa.store.getFreeCapacity());
  }

  getDroppedResources(room: IRoom): IResource[] {
    return room.find<IResource>(FIND_DROPPED_RESOURCES)
      .sort((sa, sb) => sb.amount - sa.amount);
  }

  getContainers(room: IRoom): IContainer[] {
    return room.find<IContainer>(FIND_STRUCTURES).filter(s => s.structureType === STRUCTURE_CONTAINER)
      .sort((sa, sb) => sb.store.getUsedCapacity() - sa.store.getUsedCapacity());
  }

  getConstructionSites(room: IRoom): IConstructionSite[] {
    return room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
  }

  setRoadSites(room: IRoom): void {
    let paths = energySourceService.getPathFromStoresToSources(room);
    if (!paths.length) paths = this.getPathFromStoresToController(room);

    structureService.setRoadSites(room, paths);
  }

  setConstructionSite(room: IRoom, pos: IPosition, type: string): number {
    return room.createConstructionSite(pos, type);
  }

  private calculateMinersNeeded(room: IRoom): number {
    const enSrcs = energySourceService.getRoomEnergySources(room);
    return Object.values(enSrcs).reduce((t, s) => t += s.memory.optimalMinerCapacity, 0);
  }

  private getPathFromStoresToController(room: IRoom) {
    const ctrlPos = { pos: room.controller.pos, range: 1 };
    const spawns = spawnService.getSpawnsInRoom(room);
    const paths: IPosition[] = [];

    Object.values(spawns).forEach(s => {
      paths.push(...PathFinder.search(s.pos, [ctrlPos], { swampCost: 1 }).path);
    });
    return paths;
  }
}

const roomService = new RoomService();

export { roomService };
