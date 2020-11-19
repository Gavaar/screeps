import { nameService } from '@common/name_creator.service';
import { CreepType } from '@creeps/creep.interface';
import { creepService } from '@creeps/creep.service';
import { AbstractSpawn } from './_spawn.abstract';

class Spawn extends AbstractSpawn {
  run(): void {
    if (!Object.values(Game.creeps).length) {
      return this.spawnCreep(CreepType.Miner);
    }

    const capacityAvailable = this.room.energyCapacityAvailable;

    switch (this.ctrlLevel) {
      case 2:
        if (this.room.memory.latestCapacity !== capacityAvailable) this.recalculateRoomValues()
      default:
        if (this.room.energyAvailable === capacityAvailable) {
          const type = creepService.nextRequiredCreep(this.room, this.ctrlLevel);
          if (type) this.spawnCreep(type);
        } else if (!this.room.memory.currentCreeps.collector) {
          this.spawnCreep(CreepType.Collector);
        }
    }
  }

  private spawnCreep(type: CreepType) {
    const _name = `${type}_${nameService.createName()}`;
    const parts = creepService.bodyPartsByCapacity(type, this.room.energyAvailable);
    this.spawn.spawnCreep(parts, _name);

    this.room.memory.currentCreeps[type] += 1;
    Memory.creeps[_name] = { type };
  }

  private recalculateRoomValues() {
    delete this.room.memory.creepCapacity;
    this.room.memory.latestCapacity = this.room.energyCapacityAvailable;
    creepService.creepCapacity(this.room);
    Object.values(Game.creeps).map((c: ICreep<any>) => this.room.memory.currentCreeps[c.memory.type] += 1);
  }
}

export { Spawn };
