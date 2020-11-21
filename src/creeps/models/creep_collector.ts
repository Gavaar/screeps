import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Collector } from '@creeps/creep_parts/collector';
import { Transferer } from '@creeps/creep_parts/transferer';
import { CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

@Collector()
@Transferer()
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

  toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'transferring' ? 'collecting' : 'transferring');
  }
}

export { CCollector };
