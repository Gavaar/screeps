import { CreepType } from '@creeps/creep.interface';
import { Harvester } from '@creeps/creep_parts/harvester';
import { Transferer } from '@creeps/creep_parts/transferer';
import { AbstractCreep } from './_creep.abstract';

@Harvester()
@Transferer()
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
