import { roomService } from '@rooms/room.service';
import { CleanOnDeath, CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

@CleanOnDeath()
class CBuilder extends AbstractCreep<ICBuilderMemory> {
  type = CreepType.Builder;

  constructor(creep: ICreep<ICBuilderMemory>, opts: CreepOptions) {
    super(creep, opts);
    if (!this.memory.state) this.memory.state = 'collecting';
  }

  run() {
    if (this.memory.state === 'collecting') this.collect();
    else this.build();
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

  private getBuildTarget(): IConstructionSite {
    if (!this.memory.target) {
      const sites = roomService.getConstructionSites(this.creep.room);
      if (!sites.length) roomService.setRoadSites(this.creep.room);
      this.memory.target = (this.creep.pos.findClosestByPath(sites) || { id: '' }).id;
    }

    const site = Game.getObjectById<IConstructionSite>(this.memory.target);
    return site;
  }

  private attemptToWithdrawEnergy(target: IContainer | IResource): number {
    if (!target) return 0;
    if ((target as IContainer).structureType === STRUCTURE_CONTAINER) {
      return this.creep.withdraw(target, RESOURCE_ENERGY);
    }

    return this.creep.pickup(target as IResource);
  }

  private collect(): void {
    const target = this.getEnergyTarget();
    const transfer = this.attemptToWithdrawEnergy(target);

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
}

export { CBuilder };
