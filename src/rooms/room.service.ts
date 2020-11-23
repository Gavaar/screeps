import { spawnService } from '@spawns/spawn.service';

class RoomService {
  constructionSites(room: IRoom): IConstructionSite[] {
    return room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
  }

  roomStructures(room: IRoom): IStructure[] {
    return room.find<IRoad | ISpawn | IExtension | IContainer>(FIND_STRUCTURES);
  }

  setRamparts(room: IRoom): void {
    if (room.memory.rampartsSet) return;
    const spawns = spawnService.getSpawnsInRoom(room);
    for (const spawnName in spawns) {
      const { x, y } = spawns[spawnName].pos;
      const range = 3;
      room.lookForAtArea(LOOK_TERRAIN, y - range, x - range, y + range, x + range, true).forEach(terr => {
        if (terr.terrain !== 'wall') {
          room.createConstructionSite(room.getPositionAt(terr.x, terr.y), STRUCTURE_RAMPART);
        }
      });
    }
    room.memory.rampartsSet = true;
  }

  setTowers(room: IRoom): void {
    if (room.memory.towers > 0) return;
    const spawns = spawnService.getSpawnsInRoom(room);
    for (const spawnName in spawns) {
      const { x, y } = spawns[spawnName].pos;
      const findPlace = (range: number): (IRoomTerrain | undefined) => {
        return room.lookForAtArea(LOOK_TERRAIN, y - range, x - range, y + range, x + range, true).find(terr => {
          return room.createConstructionSite(room.getPositionAt(terr.x, terr.y), STRUCTURE_TOWER) === OK;
        });
      }
      let _range = 1;
      while (!findPlace(_range)) {
        _range += 1;
      }
    }
  }
}

const roomService = new RoomService();

export { roomService };
