declare interface IRoom {
  name: string;
  controller: IController;
  energyAvailable: number;
  energyCapacityAvailable: number;
  memory: IRoomMemory;
  find<U>(finding: number): U[];
  findPath(from: IPosition, to: IPosition, opts?: { ignoreCreeps?: boolean; range?: number; swampCost?: number })
  lookAt(x: number, y: number): { type: strin, [typeObj: string]: any }[];
  lookAtArea(top: number, left: number, bottom: number, right: number, asArray = false): IRoomTerrain[];
  lookForAtArea(type: string, top: number, left: number, bottom: number, right: number, asArray = false): IRoomTerrain[];
  getPositionAt(x: number, y: number): IPosition;
  createConstructionSite(pos: IPosition, type: string): number;
}

declare interface IRoomMemory {
  sources: { [id: string]: ISource }
  creepCapacity: RequiredCreeps;
  currentCreeps: RequiredCreeps;
  latestCapacity: number;
  latestCtrlLevel: number;
  rampartsSet: boolean | undefined;
  towers: number;
}
