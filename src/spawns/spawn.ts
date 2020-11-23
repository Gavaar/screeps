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
      case 1:
        if (this.room.memory.latestCapacity !== capacityAvailable) this.recalculateRoomValues()
      default:
        if (this.ctrlLevel !== this.room.memory.latestCtrlLevel) this.recalculateRoomValues();
        if (this.room.energyAvailable === capacityAvailable) {
          const type = creepService.nextRequiredCreep(this.room, this.ctrlLevel);
          if (type) this.spawnCreep(type);
        }
    }
  }

  private spawnCreep(type: CreepType) {
    const _name = `${type}_${nameService.createName()}`;
    const parts = creepService.bodyPartsByCapacity(type, this.room.energyAvailable);
    this.spawn.spawnCreep(parts, _name, { memory: { type }});
    this.room.memory.currentCreeps[type] += 1;
  }

  private recalculateRoomValues() {
    this.room.memory = {} as IRoomMemory;
    const latestCapacity = this.room.energyCapacityAvailable;
    const latestCtrlLevel = controllerService.getCustomCtrlLevel(this.room);
    const creepCapacity = creepService.creepCapacity(this.room);
    const currentCreeps = (Object.keys(Memory.creeps)).reduce((current, name: string) => {
      if (!Game.creeps[name]) {
        delete Memory.creeps[name];
      } else {
        current[Memory.creeps[name].type] += 1;
      }
      return current;
    }, { miner: 0, collector: 0, builder: 0, upgrader: 0, refiller: 0 } as { [type: string]: number });

    this.room.memory = { ...this.room.memory, latestCtrlLevel, latestCapacity, creepCapacity, currentCreeps };
  }
}

export { Spawn };
