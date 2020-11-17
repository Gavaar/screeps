import { roomService } from '@rooms/room.service';

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

      private getBuildTarget(): IConstructionSite {
        if (!this.memory.target) {
          const sites = roomService.getConstructionSites(this.creep.room);
          if (!sites.length) roomService.setRoadSites(this.creep.room);
          this.memory.target = (this.creep.pos.findClosestByPath(sites) || { id: '' }).id;
        }

        const site = Game.getObjectById<IConstructionSite>(this.memory.target);
        return site;
      }

      private build(): void {
        const target = this.getBuildTarget();
        const build = this.creep.build(target);

        if (build === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
        if (build === ERR_NOT_ENOUGH_RESOURCES && this.toggleState) this.toggleState();
      }
    }

    return builderCreep;
  }
}

export { Builder }
