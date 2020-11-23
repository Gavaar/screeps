declare interface IMemory {
  constants: { id: number };
  creeps: { [creepName: string]: ICreepMemory };
  rooms: { [roomName: string]: IRoomMemory };
}
