declare interface ISpawn {
  id: string;
  room: IRoom;
  name: string;
  spawnCreep(body: string[], name: string): number;
}
