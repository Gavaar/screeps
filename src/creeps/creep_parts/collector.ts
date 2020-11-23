import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { storageService } from '@rooms/structures/storage.service';

/** Attaches `collect` which uses `getEnergyTarget` and `attemptToWithdrawEnergy` to creep.
 *
 * It adds the creep the capability to get energy from a Source, in preferred order: fullest_store > dropped.
 * It defaults to take from any other store if there's no dropped resource. It can be turned off.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when collector store is full.
 */
function Collector(takeFromAnySource = true) {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const collectorCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      private collect(): void {
        const target = this.getEnergyTarget();
        const withdraw = this.attemptToWithdrawEnergy(target);

        this.creep.say('♻️', true);

        if (withdraw === ERR_NOT_IN_RANGE) {
          this.creep.moveTo(target.pos, { visualizePathStyle: this.visualizePathStyle });
        }
        if (withdraw === ERR_NOT_ENOUGH_RESOURCES || withdraw === ERR_INVALID_TARGET) this.memory.target = '';
        if ((withdraw === ERR_FULL || !this.store.getFreeCapacity(RESOURCE_ENERGY)) && this.toggleState) {
          this.toggleState();
        }
      }

      private getEnergyTarget(): IResource | IContainer {
        if (!this.memory.target) {
          const storages = storageService.getStorages(this.creep.room).reverse();
          const container = storages.filter(s => s.structureType === STRUCTURE_CONTAINER)[0];

          if (container) {
            this.memory.target = container.id;
          } else {
            const dropped = this.pos.findClosestByPath(energySourceService.droppedResources(this.creep.room));
            if (dropped) {
              this.memory.target = dropped.id;
            } else if (takeFromAnySource) {
              const restStorage = storages.filter(s => s.store.getUsedCapacity(RESOURCE_ENERGY))[0];
              if (restStorage) this.memory.target = restStorage.id;
            }
          }
        }

        const energy = Game.getObjectById<IResource>(this.memory.target);
        if (!energy) this.memory.target = '';
        return energy;
      }

      private attemptToWithdrawEnergy(target: IContainer | IResource): number {
        if (!target) return 0;
        if ((target as IContainer).store) {
          const withdrew = this.creep.withdraw(target, RESOURCE_ENERGY);
          if (!(target as IContainer).store.getUsedCapacity(RESOURCE_ENERGY)) {
            this.creep.memory.target = '';
          }
          return withdrew;
        }
        const picked = this.creep.pickup(target as IResource);
        if (!(target as IResource).amount) {
          this.creep.memory.target = '';
        }
        return picked;
      }
    }

    return collectorCreep;
  }
}

export { Collector }
