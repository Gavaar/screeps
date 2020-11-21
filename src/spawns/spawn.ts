import { nameService } from '@common/name_creator.service';
import { CreepType } from '@creeps/creep.interface';
import { creepService } from '@creeps/creep.service';
import { controllerService } from '@rooms/controller/controller.service';
import { AbstractSpawn } from './_spawn.abstract';

class Spawn extends AbstractSpawn {
  run(): void {
    if (!Object.values(Game.creeps).length) {
      this.recalculateRoomValues();
      return this.spawnCreep(CreepType.Refiller);
    }

    const capacityAvailable = this.room.energyCapacityAvailable;

    switch (this.ctrlLevel) {
      case 2:
        if (this.room.memory.latestCapacity !== capacityAvailable) this.recalculateRoomValues()
      default:
        if (this.ctrlLevel !== this.room.memory.latestCtrlLevel) this.recalculateRoomValues();
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
    const latestCapacity = this.room.energyCapacityAvailable;
    const latestCtrlLevel = controllerService.getCustomCtrlLevel(this.room);
    const creepCapacity = creepService.creepCapacity(this.room);
    const currentCreeps = Object.values(Game.creeps).reduce((current, c: ICreep<any>) => {
      current[c.memory.type] += 1;
      return current;
    }, { miner: 0, collector: 0, builder: 0, upgrader: 0, refiller: 0 });
    const sources = this.room.memory.sources;

    this.room.memory = { latestCtrlLevel, latestCapacity, creepCapacity, currentCreeps, sources };
  }
}

export { Spawn };
