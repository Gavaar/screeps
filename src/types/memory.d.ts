import { CreepType, RequiredCreeps } from '@creeps/creep.interface';

declare interface IMemory {
  id: number;
  creeps: { [creepName: string]: ICreepMemory };
  rooms: { [roomName: string]: IRoomMemory };
}
