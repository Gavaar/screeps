import { AbstractRoom } from './_room.abstract';

class Room extends AbstractRoom {
  run() {
    for (const spawnName in this.spawns) {
      if (this.energyAvailable < 300) return;
      this.spawns[spawnName].create();
    }
  }
}

export { Room };
