import { creepService } from '@creeps/creep.service';
import { AbstractCreep } from '@creeps/_creep.abstract';
import { spawnService } from '@spawns/spawn.service';
import { AbstractSpawn } from '@spawns/_spawn.abstract';

abstract class AbstractRoom {
  get name() {
    return this._room.name;
  }
  get energyAvailable() {
    return this._room.energyAvailable;
  }
  get energyCapacityAvailable() {
    return this._room.energyCapacityAvailable;
  }

  spawns: { [name: string]: AbstractSpawn };
  creeps: { [name: string]: AbstractCreep<any> };

  private _room: IRoom;

  constructor(room: IRoom) {
    this._room = room;
    this.spawns = spawnService.getSpawnsInRoom(room);
    this.creeps = creepService.getMyCreepsInRoom(room);
    if (!Memory.rooms[room.name]) Memory.rooms[room.name] = {};
  }

  abstract run(): void;
}

export { AbstractRoom };
