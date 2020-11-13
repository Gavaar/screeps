import { Spawn } from './spawn';
import { AbstractSpawn } from './_spawn.abstract';

class SpawnService {
  getSpawnsInRoom(room: IRoom): { [name: string]: AbstractSpawn } {
    return room.find(FIND_MY_SPAWNS).reduce((result, spawn) => {
      result[spawn.name] = new Spawn(spawn);
      return result;
    }, {} as { [name: string]: AbstractSpawn });
  }
}

const spawnService = new SpawnService();

export { spawnService };
