/* Screeps V1.0.0 */
import { Room } from './rooms/room';
import { roomService } from './rooms/room.service';

const rooms = roomService.getRooms();
for (const roomName in rooms) {
  const room = new Room(rooms[roomName]);
  room.run();
}
