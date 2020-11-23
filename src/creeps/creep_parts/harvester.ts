import { energySourceService } from '@rooms/energy_sources/energy_source.service';

/** Attaches `harvest` to creep.
 * `harvest` uses `extractEnergy`, `isInHarvestPosition`, `moveToHarvestPosition`, `findFreeContainer`,
 * `getHarvestSource` to work properly.
 *
 * It adds the creep the capability to get mine from a Source, it finds a container over which to do it from.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when harvester store is full.
 */
function Harvester() {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const harvesterCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      harvest() {
        const src = this.getHarvestSrc();
        if (!src) return;
        const correctPos = this.isInHarvestPosition(src);
        this.creep.say('⛏️', true);

        if (correctPos) {
          this.extractEnergy(src);
        } else {
          this.moveToHarvestPosition(src);
        }
      }

      private extractEnergy(src: ISource) {
        this.creep.harvest(src);
        if (!this.store.getFreeCapacity(RESOURCE_ENERGY) && this.toggleState) this.toggleState();
      }

      private isInHarvestPosition(src: ISource): boolean {
        const movePos = this.findFreeContainer(src);
        return (movePos.x === this.pos.x && movePos.y === this.pos.y);
      }

      private moveToHarvestPosition(src: ISource): void {
        const movePos = this.findFreeContainer(src);
        const moved = this.creep.moveTo(movePos, { visualizePathStyle: this.visualizePathStyle });
        if (moved === ERR_NO_PATH || moved === ERR_INVALID_TARGET) {
          delete this.creep.memory.miningPos;
        }
      }

      private findFreeContainer(src: ISource) {
        if (!this.memory.miningPos) {
          const posToWork = energySourceService.findFreeContainerInSource(src);
          if (!posToWork) delete this.memory.miningSite;
          this.memory.miningPos = posToWork || {};
        }
        return this.memory.miningPos;
      }

      private getHarvestSrc(): ISource {
        if (!this.memory.miningSite) {
          this.memory.miningSite = energySourceService.nextEnergySourceInRoom(this.creep.room);
        }

        return Game.getObjectById<ISource>(this.memory.miningSite);
      }
    }

    return harvesterCreep;
  }
}

export { Harvester };
