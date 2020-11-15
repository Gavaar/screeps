declare interface IPosition {
  roomName: string;
  x: number;
  y: number;
}

declare interface IRoomTerrain {
  x: number;
  y: number;
  type: string;
  [extra: string]: any;
}