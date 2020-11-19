class StorageService {
  getStorages(room: IRoom, my = false): (ISpawn | IContainer)[] {
    return room.find<ISpawn | IContainer>(my ? FIND_MY_STRUCTURES : FIND_STRUCTURES)
      .filter(s => s.store)
      .sort((sa, sb) => sb.store.getFreeCapacity() - sa.store.getFreeCapacity());
  }

  getContainers(room: IRoom): IContainer[] {
    return room.find<IContainer>(FIND_STRUCTURES).filter(s => s.structureType === STRUCTURE_CONTAINER)
      .sort((sa, sb) => sb.store.getUsedCapacity() - sa.store.getUsedCapacity());
  }

  setExtension(room: IRoom) {}

  private findExtensionPositions() {}
}

const storageService = new StorageService();
export { storageService };
