import { CreepType } from '@creeps/creep.interface';
import { roomService } from '@rooms/room.service';
import { Spawn } from './spawn';
import { AbstractSpawn } from './_spawn.abstract';

class SpawnService {
  getSpawnsInRoom(room: IRoom): { [name: string]: AbstractSpawn } {
    return room.find<ISpawn>(FIND_MY_SPAWNS).reduce((result, spawn) => {
      result[spawn.name] = new Spawn(spawn);
      return result;
    }, {} as { [name: string]: AbstractSpawn });
  }

  nextRequiredCreep(room: IRoom): CreepType | void {
    const { miner, collector, builder } = roomService.getCreepCapacity(room);
    const { currentCreeps } = room.memory;

    if (currentCreeps.miner * 2 > currentCreeps.collector && currentCreeps.collector < collector) {
      return CreepType.Collector;
    } else if (currentCreeps.miner < miner) {
      return CreepType.Miner;
    } else if (currentCreeps.builder < builder) {
      return CreepType.Builder;
    } else {
      return CreepType.Upgrader;
    }
  }
}

const spawnService = new SpawnService();

export { spawnService };
