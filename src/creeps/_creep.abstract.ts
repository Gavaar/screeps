import { CreepType } from './creep.interface';

interface CreepOptions {
  name: string;
}

abstract class AbstractCreep<T> {
  name: string;

  get memory(): T {
    return this.creep.memory;
  }

  abstract type: CreepType;

  protected creep: ICreep<T>;

  constructor(creep: ICreep<T>, opts: CreepOptions) {
    this.name = opts.name;
    this.creep = creep;
  }

  abstract run(): void;
}

export { AbstractCreep, CreepOptions };
