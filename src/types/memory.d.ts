import { CreepType, RequiredCreeps } from 'src/creeps/creep.interface';

declare interface IMemory {
  id: number;
  creeps: { [creepName: string]: ICreepMemory };
  rooms: { [roomName: string]: IRoomMemory };
}
