class RoomService {
  constructionSites(room: IRoom): IConstructionSite[] {
    return room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
  }
}

const roomService = new RoomService();

export { roomService };
