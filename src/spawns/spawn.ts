import { nameService } from '@common/name_creator.service';
import { CreepType } from '@creeps/creep.interface';
import { spawnService } from './spawn.service';
import { AbstractSpawn } from './_spawn.abstract';

const CREEP_PARTS_BY_TYPE = {
  [CreepType.Miner]: [WORK, WORK, MOVE],
  [CreepType.Collector]: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
  [CreepType.Builder]: [WORK, MOVE, MOVE, CARRY, CARRY],
};

class Spawn extends AbstractSpawn {
  run() {
    if (this.room.energyAvailable >= 300) {
      const type = spawnService.nextRequiredCreep(this.room);
      if (type) this.spawnCreep(type);
    }
  }

  private spawnCreep(type: CreepType) {
    const _name = nameService.createName();
    this.spawn.spawnCreep(
      CREEP_PARTS_BY_TYPE[type],
      _name,
    );

    this.room.memory.currentCreeps[type] += 1;
    Memory.creeps[_name] = { type };
  }
}

export { Spawn };
