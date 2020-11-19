import { nameService } from '@common/name_creator.service';
import { CreepType } from '@creeps/creep.interface';
import { creepService } from '@creeps/creep.service';
import { AbstractSpawn } from './_spawn.abstract';

class Spawn extends AbstractSpawn {
  run() {
    const capacityAvailable = this.room.energyCapacityAvailable;

    switch (this.ctrlLevel) {
      case 1:
        if (this.room.memory.latestCapacity !== capacityAvailable) this.recalculateRoomValues()
      default:
        if (this.room.energyAvailable === capacityAvailable) {
          const type = creepService.nextRequiredCreep(this.room, this.ctrlLevel);
          if (type) this.spawnCreep(type);
        }
    }
  }

  private spawnCreep(type: CreepType) {
    const _name = `${type}_${nameService.createName()}`;
    const parts = creepService.bodyPartsByCapacity(type, this.room.energyCapacityAvailable);
    this.spawn.spawnCreep(parts, _name);

    this.room.memory.currentCreeps[type] += 1;
    Memory.creeps[_name] = { type };
  }

  private recalculateRoomValues() {
    delete this.room.memory.creepCapacity;
    creepService.creepCapacity(this.room);
  }
}

export { Spawn };
