abstract class AbstractSpawn {
  get name(): string {
    return this._structureSpawn.name;
  }
  get room(): IRoom {
    return this._structureSpawn.room;
  }
  get id() {
    return this._structureSpawn.id;
  }

  private _structureSpawn: ISpawn;
  constructor(spawn: ISpawn) {
    this._structureSpawn = spawn;
  }

  abstract create(): number;
}

export { AbstractSpawn };
