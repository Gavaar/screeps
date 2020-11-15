declare interface IStore {
  getCapacity(res?: string): number;
  getFreeCapacity(res?: string): number;
  getUsedCapacity(res?: string): number;
}
