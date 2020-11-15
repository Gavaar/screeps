abstract class AbstractSpawn {
  get name(): string {
    return this.spawn.name;
  }
  get room(): IRoom {
    return this.spawn.room;
  }
  get id() {
    return this.spawn.id;
  }

  protected spawn: ISpawn;

  constructor(spawn: ISpawn) {
    this.spawn = spawn;
  }

  abstract run(): void;
}

export { AbstractSpawn };
