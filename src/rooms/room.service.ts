import { IGame } from 'src/types/game';
import { RequiredCreeps } from 'src/creeps/creep.interface';
import { energySourceService } from './energy_sources/energy_source.service';

class RoomService {
  getRooms(): IGame['rooms'] {
    if (!Memory.rooms) Memory.rooms = {};
    return Game.rooms;
  }

  getCreepCapacity(room: IRoom): RequiredCreeps {
    if (room.memory.creepCapacity) return room.memory.creepCapacity;

    const miner = this.calculateMinersNeeded(room);
    const collector = miner * 2;
    const builder = 1;

    room.memory.creepCapacity = { miner, collector, builder }
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
    return room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
  }

  private calculateMinersNeeded(room: IRoom): number {
    const enSrcs = energySourceService.getRoomEnergySources(room);
    // maximum energy per tick extractable to not oversaturate the source
    const workCapacityPerTick = Object.values(enSrcs).reduce((t, e) => t += e.energyCapacity, 0) / 600;
    // room capacity - required at least 1 move
    const unitWorkCapacity = Math.floor((room.energyCapacityAvailable - 50) / 100);
    return workCapacityPerTick / unitWorkCapacity;
  }
}

const roomService = new RoomService();

export { roomService };
