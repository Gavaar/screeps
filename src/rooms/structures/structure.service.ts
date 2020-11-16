import { roomService } from '@rooms/room.service';

class StructureService {
  setRoadSites(room: IRoom, paths: IPosition[], limit = 10): void {
    const noRoads = paths.filter(pos => {
      const structures = pos.lookFor<IRoad>(LOOK_STRUCTURES);
      return (structures.find(s => s.structureType === STRUCTURE_ROAD) == null);
    });

    noRoads.length = limit;
    noRoads.map(p => roomService.setConstructionSite(room, p, STRUCTURE_ROAD));
  }

  setStorageSite(room: IRoom, pos: IPosition): void {
    room.createConstructionSite(pos, STRUCTURE_CONTAINER);
  }
}

const structureService = new StructureService();

export { structureService };