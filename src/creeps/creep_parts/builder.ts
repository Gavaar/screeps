import { roomService } from '@rooms/room.service';
import { roadService } from '@rooms/structures/road.service';
import { storageService } from '@rooms/structures/storage.service';

/** Attaches `build` which uses `getBuildTarget` to creep.
 *
 * It adds the creep the capability to build construction sites, or set new sites,
 * in preferred order: storages > roads.
 *
 * if `toggleState` function exists in the body of the creep, it will be called when collector store is full.
 */
function Builder() {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const builderCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
      }

      private prepareSiteToBuild(): IConstructionSite {
        const sites = roomService.constructionSites(this.creep.room);
        if (!sites.length) {
          this.setBuildingSites();
          // add more site adding here
          sites.push(...roomService.constructionSites(this.creep.room))
        }

        this.memory.target = (this.creep.pos.findClosestByPath(sites) || { id: '' }).id;
        return Game.getObjectById<IConstructionSite>(this.memory.target);
      }

      private setBuildingSites(): void {
        switch (this.ctrlLevel) {
          case 3:
            roomService.setTowers(this.creep.room);
          case 2:
            storageService.setExtension(this.creep.room);
            roomService.setRamparts(this.creep.room);
          default:
            roadService.setRoadSites(this.creep.room);
        }
      }

      private getDamagedStruct(hpTreshold = 0.8) {
        const damaged = roomService.roomStructures(this.room).filter((struct: IStructure) => {
          if (struct.structureType === STRUCTURE_WALL) return false;
          return (struct.hits / struct.hitsMax) < hpTreshold;
        });

        this.memory.target = (this.creep.pos.findClosestByPath(damaged) || { id: '' }).id;
        return Game.getObjectById<IConstructionSite>(this.memory.target);
      }

      protected build(): void {
        const target = this.getDamagedStruct(0.05) || this.prepareSiteToBuild() || this.getDamagedStruct();
        if (!target) return;
        const build = this.creep[target.progressTotal ? 'build' : 'repair'](target);
        this.creep.say(`${target.progressTotal ? '🔨' : '🧰'}`, true);

        if (build === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: this.visualizePathStyle });
        if (build === ERR_INVALID_TARGET) this.memory.target = '';
        if ((build === ERR_NOT_ENOUGH_RESOURCES || !this.store.getUsedCapacity()) && this.toggleState) {
          this.toggleState();
        }
      }
    }

    return builderCreep;
  }
}

export { Builder }
