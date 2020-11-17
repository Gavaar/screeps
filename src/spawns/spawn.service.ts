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

  nextRequiredCreep(room: IRoom, ctrlLevel: number): CreepType | void {
    const { miner, collector, builder, upgrader } = roomService.getCreepCapacity(room);
    const { currentCreeps } = room.memory;

    switch(ctrlLevel) {
      case 0:
        if (currentCreeps.miner < miner && currentCreeps.miner <= currentCreeps.builder) return CreepType.Miner;
        else if (currentCreeps.builder < builder) return CreepType.Builder;
        break;
      default:
        if (currentCreeps.miner > currentCreeps.collector && currentCreeps.collector < collector) {
          return CreepType.Collector;
        } else if (currentCreeps.miner < miner) {
          return CreepType.Miner;
        } else if (currentCreeps.builder < builder) {
          return CreepType.Builder;
        } else if (currentCreeps.upgrader < upgrader) {
          return CreepType.Upgrader;
        }
      break;
    }
  }
}

const spawnService = new SpawnService();

export { spawnService };
