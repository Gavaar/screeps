import { CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';
import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Collector } from '@creeps/creep_parts/collector';
import { Upgrader } from '@creeps/creep_parts/upgrader';

@Upgrader()
@Collector()
@CleanOnDeath()
class CUpgrader extends AbstractCreep<ICUpgraderMemory> {
  type = CreepType.Upgrader;

  constructor(creep: ICreep<ICUpgraderMemory>, opts: CreepOptions) {
    super(creep, opts);
    if (!this.memory.state) this.memory.state = 'collecting';
  }

  run() {
    if (this.memory.state === 'collecting') this.collect();
    else this.upgrade();
  }

  toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'upgrading' ? 'collecting' : 'upgrading');
  }
}

export { CUpgrader };
