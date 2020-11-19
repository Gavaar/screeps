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
          case 2:
            storageService.setExtension(this.creep.room);
          default:
            roadService.setRoadSites(this.creep.room);
        }
      }

      private build(): void {
        const target = this.prepareSiteToBuild();
        const build = this.creep.build(target);

        if (build === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
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
