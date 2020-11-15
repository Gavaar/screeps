import { roomService } from '@rooms/room.service';
import { CreepType } from './creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

class CBuilder extends AbstractCreep<ICBuilderMemory> {
  type = CreepType.Builder;

  constructor(creep: ICreep<ICBuilderMemory>, opts: CreepOptions) {
    super(creep, opts);
    if (!this.memory.state) this.memory.state = 'collecting';
  }

  run() {
    if (this.memory.state === 'collecting') this.collect();
    else this.build();

    this.beforeDestroy();
  }

  private getEnergyTarget(): IResource {
    if (!this.memory.target) {
      const storages = roomService.getRoomStorages(this.creep.room);
      this.memory.target = storages[storages.length - 1].id; // fullest
    }

    return Game.getObjectById<IResource>(this.memory.target);
  }

  private getBuildTarget(): IConstructionSite {
    if (!this.memory.target) {
      const sites = roomService.getConstructionSites(this.creep.room);
      this.memory.target = this.creep.pos.findClosestByPath(sites).id;
    }

    const site = Game.getObjectById<IConstructionSite>(this.memory.target);
    if (!site) {
      this.memory.target = '';
    }

    return site;
  }

  private collect(): void {
    const target = this.getEnergyTarget();
    const transfer = this.creep.withdraw(target, RESOURCE_ENERGY);

    if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (transfer === ERR_NOT_ENOUGH_RESOURCES) this.creep.memory.target = '';
    if (transfer === ERR_FULL) this.toggleState();
  }

  private build(): void {
    const target = this.getBuildTarget();
    const build = this.creep.build(target);

    if (build === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (build === ERR_NOT_ENOUGH_RESOURCES) this.toggleState();
  }

  private toggleState() {
    this.memory.target = '';
    this.memory.state = this.memory.state === 'building' ? 'collecting' : 'building';
  }

  private beforeDestroy() {
    if (this.creep.ticksToLive === 1) {
      this.creep.room.memory.currentCreeps[this.type] -= 1;
      delete Memory.creeps[this.name];
    }
  }
}

export { CBuilder };
