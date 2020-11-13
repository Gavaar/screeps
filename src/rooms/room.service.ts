import { IGame } from 'src/types/game';

class RoomService {
  getRooms(): IGame['rooms'] {
    return Game.rooms;
  }
}

const roomService = new RoomService();

export { roomService };
