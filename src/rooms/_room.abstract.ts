import { creepService } from '@creeps/creep.service';
import { AbstractCreep } from '@creeps/models/_creep.abstract';
import { spawnService } from '@spawns/spawn.service';
import { AbstractSpawn } from '@spawns/_spawn.abstract';
import { controllerService } from './controller/controller.service';

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

  protected _room: IRoom;
  protected ctrlLevel: number;

  constructor(room: IRoom) {
    if (!Memory.rooms[room.name]) {
      delete Memory.creeps;
      Memory.id = 0;
      Memory.rooms = { [room.name]: {} };
    }

    this._room = room;
    this.spawns = spawnService.getSpawnsInRoom(room);
    this.creeps = creepService.getMyCreepsInRoom(room);
    this.ctrlLevel = controllerService.getCustomCtrlLevel(room);
  }

  abstract run(): void;
}

export { AbstractRoom };
