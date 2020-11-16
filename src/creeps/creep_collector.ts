import { roomService } from '@rooms/room.service';
import { CreepType } from './creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

class CCollector extends AbstractCreep<ICCollectorMemory> {
  type = CreepType.Collector;

  get energyStore() {
    return this.creep.store
  }

  constructor(creep: ICreep<ICCollectorMemory>, opts: CreepOptions) {
    super(creep, opts);
    if (!this.memory.state) this.memory.state = 'collecting';
  }

  run() {
    if (this.memory.state === 'collecting') this.collect();
    else this.transfer();

    this.beforeDestroy();
  }

  private getStructureTarget(): ISpawn | IContainer {
    if (!this.memory.target) {
      const emptiestStorage = roomService.getRoomStorages(this.creep.room)[0];
      this.memory.target = emptiestStorage.id;
    }

    return Game.getObjectById<ISpawn | IContainer>(this.memory.target);
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

  private collect(): void {
    const target = this.getEnergyTarget();
    const transfer = this.attemptToWithdrawEnergy(target);

    if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (transfer === ERR_FULL) this.toggleState();
  }

  private attemptToWithdrawEnergy(target: IContainer | IResource): number {
    if (!target) return 0;
    if ((target as IContainer).type === STRUCTURE_CONTAINER) {
      return this.creep.withdraw(target, RESOURCE_ENERGY);
    }

    return this.creep.pickup(target as IResource);
  }

  private transfer(): void {
    const target = this.getStructureTarget();
    const transfer = this.creep.transfer(target, RESOURCE_ENERGY);

    if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (transfer === ERR_FULL) this.creep.memory.target = '';

    if (!this.creep.store.getUsedCapacity()) this.toggleState();
  }

  private toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'transferring' ? 'collecting' : 'transferring');
  }

  private beforeDestroy() {
    if (this.creep.ticksToLive === 1) {
      this.creep.room.memory.currentCreeps[this.type] -= 1;
      delete Memory.creeps[this.name];
    }
  }
}

export { CCollector };
