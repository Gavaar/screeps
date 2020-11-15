import { roomService } from '@rooms/room.service';

class RoadService {
  setConstructionSites(room: IRoom, paths: IPosition[], limit = 10): void {
    paths.length = limit;
    paths.map(p => roomService.setConstructionSite(room, p, STRUCTURE_ROAD));
  }
}

const roadService = new RoadService();

export { roadService };