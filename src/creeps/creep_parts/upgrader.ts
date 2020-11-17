
/** Attaches `upgrade` which uses `getController` to creep.
 *
 * It adds the creep the capability to upgrade the room controller.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when collector store is empty.
 */
function Upgrader() {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const upgraderCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      private upgrade(): void {
        const target = this.getController();
        const upgrade = this.creep.upgradeController(target);

        if (upgrade === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (upgrade === ERR_NOT_ENOUGH_RESOURCES) this.toggleState();
      }

      private getController(): IController {
        if (!this.memory.target) {
          this.memory.target = this.room.controller.id;
        }

        return Game.getObjectById<IController>(this.memory.target);
      }
    }

    return upgraderCreep;
  }
}

export { Upgrader }
