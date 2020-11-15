declare interface IPosition {
  roomName: string;
  x: number;
  y: number;
  findClosestByPath(objects: any[]): any;
}

declare interface IRoomTerrain {
  x: number;
  y: number;
  type: string;
  [extra: string]: any;
}