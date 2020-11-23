declare interface ISpawn extends IStructure {
  name: string;
  store: IStore;
  spawnCreep(body: string[], name: string, opts: { memory: ICreepMemory }): number;
}
