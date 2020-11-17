import { Builder } from '@creeps/creep_parts/builder';
import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Collector } from '@creeps/creep_parts/collector';
import { roomService } from '@rooms/room.service';
import { CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

@Builder()
@Collector()
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

  toggleState() {
    this.memory.target = '';
    this.memory.state = this.memory.state === 'building' ? 'collecting' : 'building';
  }
}

export { CBuilder };
