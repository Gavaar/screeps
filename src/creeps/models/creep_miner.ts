import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { Harvester } from '@creeps/creep_parts/harvester';
import { CreepType } from '../creep.interface';
import { AbstractCreep } from './_creep.abstract';

const onDeath = (creep: CMiner) => {
  creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
}

@Harvester()
@CleanOnDeath(onDeath)
class CMiner extends AbstractCreep<ICMinerMemory> {
  type = CreepType.Miner;
  visualizePathStyle = { stroke: '#ebc334', opacity: 0.4 };

  run() {
    this.harvest();
  }
}

export { CMiner };
