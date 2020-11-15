declare interface IRoom {
  name: string;
  energyAvailable: number;
  energyCapacityAvailable: number;
  memory: IRoomMemory;
  find<U>(finding: string): U[];
  lookAtArea(top: number, left: number, bottom: number, right: number, asArray = false): IRoomTerrain[];
}

declare interface IRoomMemory {
  sources: { [id: string]: ISource }
  creepCapacity: RequiredCreeps;
  currentCreeps: RequiredCreeps;
}
