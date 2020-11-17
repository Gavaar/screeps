import { roomService } from '@rooms/room.service';

/** Attaches `collect` which uses `getEnergyTarget` and `attemptToWithdrawEnergy` to creep.
 *
 * It adds the creep the capability to get energy from a Source, in preferred order: dropped > fullest_store.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when collector store is full.
 */
function Collector() {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const collectorCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      private collect(): void {
        const target = this.getEnergyTarget();
        const transfer = this.attemptToWithdrawEnergy(target);

        if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_FULL && this.toggleState) this.toggleState();
      }

      private getEnergyTarget(): IResource | IContainer {
        if (!this.memory.target) {
          const dropped = roomService.getDroppedResources(this.creep.room)[0];
          if (dropped) {
            this.memory.target = dropped.id;
          } else {
            const container = roomService.getContainers(this.creep.room)[0];
            if (container) this.memory.target = container.id;
          }
        }

        const energy = Game.getObjectById<IResource>(this.memory.target);
        if (!energy) this.memory.target = '';
        return energy;
      }


      private attemptToWithdrawEnergy(target: IContainer | IResource): number {
        if (!target) return 0;
        if ((target as IContainer).structureType === STRUCTURE_CONTAINER) {
          return this.creep.withdraw(target, RESOURCE_ENERGY);
        }

        return this.creep.pickup(target as IResource);
      }
    }

    return collectorCreep;
  }
}

export { Collector }
