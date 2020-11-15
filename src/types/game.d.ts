export declare interface IGame {
  rooms: { [name: string]: Room }
  getObjectById<T>(id: string): T;
}
