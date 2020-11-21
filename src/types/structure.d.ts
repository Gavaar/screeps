declare interface IStructure {
  id: string;
  pos: IPosition;
  room: IRoom;
  structureType: string;
  hits: number;
  hitsMax: number;
}
