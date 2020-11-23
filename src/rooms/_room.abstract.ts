import { nameService } from '@common/name_creator.service';
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
    this._room = room;
    this.spawns = spawnService.getSpawnsInRoom(room);
    this.creeps = creepService.myCreepsInRoom(room);
    this.ctrlLevel = controllerService.getCustomCtrlLevel(room);

    if (!Memory.rooms || !Memory.rooms[room.name]) {
      Memory.creeps = {};
      Memory.constants = { id: 0 };
      Memory.rooms = { [room.name]: {
        latestCapacity: this.energyCapacityAvailable,
        latestCtrlLevel: this.ctrlLevel,
      } as IRoomMemory } ;
    }
  }

  abstract run(): void;
}

export { AbstractRoom };
