import { CreepType, RequiredCreeps } from '@creeps/creep.interface';
import { Builder } from '@creeps/creep_parts/builder';
import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Harvester } from '@creeps/creep_parts/harvester';
import { Transferer } from '@creeps/creep_parts/transferer';
import { AbstractCreep, CreepOptions } from './_creep.abstract';

const onDeath = (creep: CRefiller) => {
  creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
}

@Harvester()
@Transferer()
@Builder()
@CleanOnDeath(onDeath)
class CRefiller extends AbstractCreep<ICRefillerMemory> {
  type = CreepType.Refiller;
  visualizePathStyle = { stroke: '#fff', opacity: 0.4 };

  constructor(creep: ICreep<ICRefillerMemory>, opts: CreepOptions) {
    super(creep, opts);
    if (!this.memory.state) this.memory.state = 'harvesting';
  }

  run() {
    // transform into builder if storages are completed
    if (this.ctrlLevel !== 0) {
      this.checkIfMutating();
    }

    if (this.memory.state === 'harvesting') this.harvest();
    else if (this.memory.state === 'transferring') this.transfer();
    else this.build();
  }

  toggleState() {
    this.memory.target = '';
    this.memory.state = (() => {
      const { creepCapacity, currentCreeps } = this.room.memory;
      const cap = creepCapacity[CreepType.Refiller] === currentCreeps[CreepType.Refiller];
      if (this.memory.state !== 'harvesting') return 'harvesting';
      return cap ? 'building' : 'transferring';
    })();
  }

  private checkIfMutating() {
    const { currentCreeps } = this.room.memory;
    if (currentCreeps.builder < currentCreeps.miner) {
      this.room.memory.currentCreeps.refiller -= 1;
      this.room.memory.currentCreeps.builder += 1;
      onDeath(this);
      Memory.creeps[this.name] = { type: CreepType.Builder };
    }
  }
}

export { CRefiller };
