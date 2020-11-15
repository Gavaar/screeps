declare interface ISpawn {
  id: string;
  room: IRoom;
  name: string;
  store: IStore;
  pos: IPosition;
  spawnCreep(body: string[], name: string): number;
}
