import { spawnService } from '@spawns/spawn.service';

class StorageService {
  getStorages(room: IRoom, my = false): (ISpawn | IExtension)[] {
    const resource = RESOURCE_ENERGY;
    return room.find<ISpawn | IExtension>(my ? FIND_MY_STRUCTURES : FIND_STRUCTURES)
      .filter(s => s.store)
      .sort((sa, sb) => {
        return sb.store.getFreeCapacity(resource) - sa.store.getFreeCapacity(resource)
      });
  }

  getContainers(room: IRoom): IContainer[] {
    const resource = RESOURCE_ENERGY;
    return room.find<IContainer>(FIND_STRUCTURES).filter(s => s.structureType === STRUCTURE_CONTAINER)
      .sort((sa, sb) => sb.store.getUsedCapacity(resource) - sa.store.getUsedCapacity(resource));
  }

  setExtension(room: IRoom): void {
    const positions = this.findExtensionPositions(room);
    positions.forEach(pos => room.createConstructionSite(room.getPositionAt(pos.x, pos.y), STRUCTURE_EXTENSION));
  }

  private findExtensionPositions(room: IRoom): IRoomTerrain[] {
    const { x, y } = Object.values(spawnService.getSpawnsInRoom(room))[0].pos;
    const range = 2;
    return room.lookForAtArea(LOOK_TERRAIN, y - range, x - range, y + range, x + range, true)
      .filter((terr, i) => terr[LOOK_TERRAIN] !== 'wall' && i % 2 === 0);
  }
}

const storageService = new StorageService();
export { storageService };
