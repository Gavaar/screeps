import { CreepType } from '@creeps/creep.interface';
import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Harvester } from '@creeps/creep_parts/harvester';
import { Transferer } from '@creeps/creep_parts/transferer';
import { AbstractCreep } from './_creep.abstract';

const onDeath = (creep: CRefiller) => {
  creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
}

@Harvester()
@Transferer()
@CleanOnDeath(onDeath)
class CRefiller extends AbstractCreep<ICRefillerMemory> {
  type = CreepType.Refiller;

  run() {
    if (this.memory.state === 'harvesting') this.harvest();
    else this.transfer();
  }

  toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'transferring' ? 'harvesting' : 'transferring');
  }
}

export { CRefiller };
