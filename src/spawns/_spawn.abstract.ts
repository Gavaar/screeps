import { controllerService } from '@rooms/controller/controller.service';

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
  get pos() {
    return this.spawn.pos;
  }

  protected spawn: ISpawn;
  protected ctrlLevel: number;

  constructor(spawn: ISpawn) {
    this.spawn = spawn;
    this.ctrlLevel = controllerService.getCustomCtrlLevel(spawn.room);
  }

  abstract run(): void;
}

export { AbstractSpawn };
