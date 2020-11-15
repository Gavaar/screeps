declare interface ISource {
  id: string;
  pos: IPosition;
  room: IRoom;
  energy: number;
  energyCapacity: number;
  memory: ISourceMemory;
}

declare interface ISourceMemory {
  miners: number;
  minerCapacity: number;
}
