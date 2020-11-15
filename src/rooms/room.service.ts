import { IGame } from 'src/types/game';
import { RequiredCreeps } from '@creeps/creep.interface';
import { energySourceService } from './energy_sources/energy_source.service';
import { roadService } from './roads/road.service';

class RoomService {
  getRooms(): IGame['rooms'] {
    if (!Memory.rooms) Memory.rooms = {};
    return Game.rooms;
  }

  getCreepCapacity(room: IRoom): RequiredCreeps {
    if (room.memory.creepCapacity) return room.memory.creepCapacity;

    room.memory.currentCreeps = { miner: 0, collector: 0, builder: 0, upgrader: 0 }

    const miner = this.calculateMinersNeeded(room);
    const collector = miner * 2;
    const builder = miner;
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

  getConstructionSites(room: IRoom): IConstructionSite[] {
    const sites = room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
    if (!sites.length) {
      const paths = energySourceService.getPathFromStoresToSources(room);
      roadService.setConstructionSites(room, paths);
    }
    return sites;
  }

  setConstructionSite(room: IRoom, pos: IPosition, type: string): number {
    return room.createConstructionSite(pos, type);
  }

  private calculateMinersNeeded(room: IRoom): number {
    const enSrcs = energySourceService.getRoomEnergySources(room);
    // maximum energy per tick extractable to not oversaturate the source
    const workCapacityPerTick = Object.values(enSrcs).reduce((t, e) => t += e.energyCapacity, 0) / (300 );
    // room capacity - required at least 1 move
    const unitWorkCapacity = Math.floor((room.energyCapacityAvailable - 50) / 100);
    const maxWorkingMiners = workCapacityPerTick / unitWorkCapacity;
    const actualWorkingSpaces = Object.values(enSrcs).reduce((t, e) => t += e.memory.minerCapacity, 0);

    return maxWorkingMiners > actualWorkingSpaces ? actualWorkingSpaces : maxWorkingMiners;
  }
}

const roomService = new RoomService();

export { roomService };
