declare interface ICreep<T> {
  name: string;
  memory: T;
  room: IRoom;
  ticksToLive: number;
  harvest(target: ISource): number;
  moveTo(target: IPosition, opts?: { 
    reusePath?: number;
    serializeMemory?: boolean;
    noPathFinding?: boolean;
    visualizePathStyle?: {};
  });
}

declare interface ICreepMemory {
  type: CreepType;
}

declare interface ICMinerMemory extends ICreepMemory {
  miningSite: string;
}
