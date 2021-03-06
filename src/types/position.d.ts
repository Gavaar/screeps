declare interface IPosition {
  roomName: string;
  x: number;
  y: number;
  findClosestByPath(objects: any[]): any;
  lookFor<T>(type: string): T[];
}

declare interface IRoomTerrain {
  x: number;
  y: number;
  type: string;
  terrain: 'wall' | 'swamp' | 'plain';
  [extra: string]: any;
}