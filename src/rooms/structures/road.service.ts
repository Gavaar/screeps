import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { storageService } from './storage.service';

class RoadService {
  setRoadSites(room: IRoom, maxSitesAtATime = 10): void {
    let paths = this.getPathsWithoutRoads(energySourceService.getPathFromStoresToSources(room));

    if (!paths.length) paths = this.getPathsWithoutRoads(this.getPathFromStoresToController(room));

    paths.length = maxSitesAtATime;
    paths.forEach(pos => room.createConstructionSite(pos, STRUCTURE_ROAD));
  }

  private getPathsWithoutRoads(paths: IPosition[]) {
    return paths.filter(pos => {
      const structures = pos.lookFor<IRoad>(LOOK_STRUCTURES);
      return (structures.find(s => s.structureType === STRUCTURE_ROAD) == null);
    });
  }

  private getPathFromStoresToController(room: IRoom) {
    const ctrlPos = { pos: room.controller.pos, range: 1 };
    const stores = storageService.getStorages(room);
    const paths: IPosition[] = [];

    stores.forEach(s => {
      paths.push(...PathFinder.search(s.pos, [ctrlPos], { swampCost: 1 }).path);
    });
    return paths;
  }
}

const roadService = new RoadService();
export { roadService };
