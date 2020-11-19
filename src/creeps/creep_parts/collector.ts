import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { storageService } from '@rooms/structures/storage.service';

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
        const withdraw = this.attemptToWithdrawEnergy(target);

        if (withdraw === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if ((withdraw === ERR_FULL || !this.store.getFreeCapacity(RESOURCE_ENERGY)) && this.toggleState) {
          this.toggleState();
        }
      }

      private getEnergyTarget(): IResource | IContainer {
        if (!this.memory.target) {
          const container = storageService.getContainers(this.creep.room)[0];

          if (container) {
            this.memory.target = container.id;
          } else {
            const dropped = this.pos.findClosestByPath(energySourceService.droppedResources(this.creep.room));
            if (dropped) this.memory.target = dropped.id;
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
