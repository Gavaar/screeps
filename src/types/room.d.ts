declare interface IRoom {
  name: string;
  energyAvailable: number;
  energyCapacityAvailable: number;
  find(finding: string): ISpawn[];
}
