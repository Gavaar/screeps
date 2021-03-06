declare interface ICreep<T> {
  name: string;
  memory: T;
  room: IRoom;
  pos: IPosition;
  ticksToLive: number;
  store: IStore;
  build(target: ICounstructionSite): number;
  repair(target: IStructure): number;
  harvest(target: ISource): number;
  transfer(target: ICreep | ISpawn, resourceType: string): number;
  withdraw(target: ICreep | ISpawn, resourceType: string): number;
  pickup(target: IResource): number;
  upgradeController(target: IController): number;
  say(message: string, public: boolean): number;
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
  miningPos?: IPosition;
}

declare interface ICRefillerMemory extends ICMinerMemory {
  target: string;
  state: 'harvesting' | 'transferring' | 'building';
}

declare interface ICCollectorMemory extends ICreepMemory {
  target: string;
  state: 'collecting' | 'transferring';
}

declare interface ICBuilderMemory extends ICreepMemory {
  target: string;
  state: 'collecting' | 'building';
}

declare interface ICUpgraderMemory extends ICreepMemory {
  target: string;
  state: 'collecting' | 'upgrading';
}
