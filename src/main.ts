/* Screeps V1.0.0 */
import { Room } from './rooms/room';

const rooms = Game.rooms;
for (const roomName in rooms) {
  const room = new Room(rooms[roomName]);
  room.run();
}
