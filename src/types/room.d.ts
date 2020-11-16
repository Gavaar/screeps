declare interface IRoom {
  name: string;
  controller: IController;
  energyAvailable: number;
  energyCapacityAvailable: number;
  memory: IRoomMemory;
  find<U>(finding: string): U[];
  lookAtArea(top: number, left: number, bottom: number, right: number, asArray = false): IRoomTerrain[];
  getPositionAt(x: number, y: number): IPosition;
  createConstructionSite(pos: IPosition, type: string): number;
}

declare interface IRoomMemory {
  sources: { [id: string]: ISource }
  creepCapacity: RequiredCreeps;
  currentCreeps: RequiredCreeps;
}
