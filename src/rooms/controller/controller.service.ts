import { roomService } from '@rooms/room.service';

class ControllerService {
  getCustomCtrlLevel(room: IRoom) {
    const originalLevel = room.controller.level;
    const modifiers = this.calculateCtrlLvlModifiers(room);

    return originalLevel + modifiers;
  }

  private calculateCtrlLvlModifiers(room: IRoom): number {
    let modifier = 0;

    const containersUnbuilt = roomService.constructionSites(room)
      .filter(site => site.structureType === STRUCTURE_CONTAINER).length;
    if (containersUnbuilt || room.controller.ticksToDowngrade > 19900) modifier -= 1;

    return modifier;
  }
}

const controllerService = new ControllerService();

export { controllerService };
