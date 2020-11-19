declare interface IGame {
  creeps: { [name: string]: ICreep };
  rooms: { [name: string]: IRoom };
  getObjectById<T>(id: string): T;
}
