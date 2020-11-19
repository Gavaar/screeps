import { storageService } from '@rooms/structures/storage.service';

/** Attaches `transfer` which uses `getStructureTarget` to creep.
 *
 * It adds the creep the capability to get transfer carried energy to a deposit.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when transferrer store is empty.
 */
function Transferer() {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const transferCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      private getStructureTarget(): ISpawn | IContainer {
        if (!this.memory.target) {
          const emptiestStorage = storageService.getStorages(this.creep.room, true)[0];
          this.memory.target = emptiestStorage.id;
        }

        return Game.getObjectById<ISpawn | IContainer>(this.memory.target);
      }

      private transfer(): void {
        const target = this.getStructureTarget();
        const transfer = this.creep.transfer(target, RESOURCE_ENERGY);

        if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (transfer === ERR_FULL) this.creep.memory.target = '';

        if (!this.creep.store.getUsedCapacity(RESOURCE_ENERGY) && this.toggleState) this.toggleState();
      }
    }

    return transferCreep;
  }
}

export { Transferer }
