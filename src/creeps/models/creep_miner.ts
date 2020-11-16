import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { CleanOnDeath, CreepType } from '../creep.interface';
import { AbstractCreep } from './_creep.abstract';

const onDeath = (creep: CMiner) => {
  creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
}

@CleanOnDeath(onDeath)
class CMiner extends AbstractCreep<ICMinerMemory> {
  type = CreepType.Miner;

  run() {
    const src = this.getMiningSrc();
    const harvesting = this.creep.harvest(src);
    if (harvesting === ERR_NOT_IN_RANGE) this.creep.moveTo(src.pos, { visualizePathStyle: {} });
    this.beforeDestroy();
  }

  private getMiningSrc(): ISource {
    if (!this.memory.miningSite) {
      this.memory.miningSite = energySourceService.getNextEnergySourceInRoom(this.creep.room);
    }

    return Game.getObjectById<ISource>(this.memory.miningSite);
  }

  private beforeDestroy(): void {
    if (this.creep.ticksToLive === 1) {
      this.creep.room.memory.currentCreeps[this.type] -= 1;
      delete Memory.creeps[this.name];
    }
  }
}

export { CMiner };
