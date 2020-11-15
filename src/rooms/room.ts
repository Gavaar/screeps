import { AbstractRoom } from './_room.abstract';

class Room extends AbstractRoom {
  run() {
    for (const spawnName in this.spawns) {
      this.runSpawn(spawnName);
    }

    for (const creepName in this.creeps) {
      this.runCreep(creepName);
    }
  }

  private runSpawn(name: string) {
    this.spawns[name].run();
  }

  private runCreep(name: string) {
    this.creeps[name].run();
  }
}

export { Room };
