import { controllerService } from '@rooms/controller/controller.service';
import { CreepType } from '../creep.interface';

interface CreepOptions {
  name: string;
}

abstract class AbstractCreep<T> {
  name: string;

  get memory(): T {
    return this.creep.memory;
  }
  get room(): IRoom {
    return this.creep.room;
  }
  get pos(): IPosition {
    return this.creep.pos;
  }
  get store(): IStore {
    return this.creep.store;
  }

  abstract type: CreepType;

  protected creep: ICreep<T>;
  protected ctrlLevel: number;

  constructor(creep: ICreep<T>, opts: CreepOptions) {
    this.name = opts.name;
    this.creep = creep;
    this.ctrlLevel = controllerService.getCustomCtrlLevel(creep.room);
  }

  protected collect() {
    console.warn(`Creep of type ${this.type} is trying to collect without the <Collector> decorator`);
  }
  protected upgrade() {
    console.warn(`Creep of type ${this.type} is trying to upgrade without the <Upgrader> decorator`);
  }
  protected build() {
    console.warn(`Creep of type ${this.type} is trying to build without the <Builder> decorator`);
  }
  protected harvest() {
    console.warn(`Creep of type ${this.type} is trying to harvest without the <Harvester> decorator`);
  }
  protected transfer() {
    console.warn(`Creep of type ${this.type} is trying to transfer without the <Transferrer> decorator`);
  }

  abstract run(): void;
}

export { AbstractCreep, CreepOptions };
