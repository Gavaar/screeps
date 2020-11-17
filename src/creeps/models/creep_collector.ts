import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Collector } from '@creeps/creep_parts/collector';
import { roomService } from '@rooms/room.service';
import { CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

@Collector()
@CleanOnDeath()
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
  }

  private getStructureTarget(): ISpawn | IContainer {
    if (!this.memory.target) {
      const emptiestStorage = roomService.getRoomStorages(this.creep.room)[0];
      this.memory.target = emptiestStorage.id;
    }

    return Game.getObjectById<ISpawn | IContainer>(this.memory.target);
  }

  private transfer(): void {
    const target = this.getStructureTarget();
    const transfer = this.creep.transfer(target, RESOURCE_ENERGY);

    if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (transfer === ERR_FULL) this.creep.memory.target = '';

    if (!this.creep.store.getUsedCapacity()) this.toggleState();
  }

  toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'transferring' ? 'collecting' : 'transferring');
  }
}

export { CCollector };
