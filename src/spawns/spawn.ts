import { nameService } from '@common/name_creator.service';
import { CreepType } from '@creeps/creep.interface';
import { spawnService } from './spawn.service';
import { AbstractSpawn } from './_spawn.abstract';

const getPartsByTypeAndLevel = (type: CreepType, lvl: number) => {
  switch (lvl) {
    default:
      return CREEP_PARTS_BY_TYPE[type];
  }
}

const CREEP_PARTS_BY_TYPE = {
  [CreepType.Miner]: [WORK, WORK, MOVE],
  [CreepType.Collector]: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  [CreepType.Builder]: [WORK, MOVE, MOVE, CARRY, CARRY],
  [CreepType.Upgrader]: [MOVE, MOVE, CARRY, CARRY, WORK],
} as { [type: string]: string[] };

class Spawn extends AbstractSpawn {
  run() {
    switch (this.ctrlLevel) {
      default:
        if (this.room.energyAvailable === this.room.energyCapacityAvailable) {
          const type = spawnService.nextRequiredCreep(this.room, this.ctrlLevel);
          if (type) this.spawnCreep(type);
        }
        break;
    }
  }

  private spawnCreep(type: CreepType) {
    const _name = `${type}_${nameService.createName()}`;
    const parts = getPartsByTypeAndLevel(type, this.ctrlLevel);
    this.spawn.spawnCreep(parts, _name);

    this.room.memory.currentCreeps[type] += 1;
    Memory.creeps[_name] = { type };
  }
}

export { Spawn };
