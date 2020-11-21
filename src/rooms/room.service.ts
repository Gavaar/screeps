class RoomService {
  constructionSites(room: IRoom): IConstructionSite[] {
    return room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
  }

  roomStructures(room: IRoom): IStructure[] {
    return room.find<IRoad | ISpawn | IExtension | IContainer>(FIND_STRUCTURES);
  }
}

const roomService = new RoomService();

export { roomService };
