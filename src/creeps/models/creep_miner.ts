import { CleanOnDeath } from '@creeps/creep_parts/clean_on_death';
import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { CreepType } from '../creep.interface';
import { AbstractCreep } from './_creep.abstract';

const onDeath = (creep: CMiner) => {
  creep.room.memory.sources[creep.memory.miningSite].memory.miners -= 1;
}

@CleanOnDeath(onDeath)
class CMiner extends AbstractCreep<ICMinerMemory> {
  type = CreepType.Miner;

  run() {
    this.harvest();
  }

  private harvest() {
    const src = this.getMiningSrc();
    const harvest = this.creep.harvest(src);

    if (harvest === ERR_NOT_IN_RANGE) {
      const movePos = this.findFreeContainer(src);
      const moved = this.creep.moveTo(movePos, { visualizePathStyle: {} });
      if (moved === ERR_NO_PATH || moved === ERR_INVALID_TARGET) {
        delete this.creep.memory.miningPos;
      }
    }
  }

  private findFreeContainer(src: ISource) {
    if (!this.memory.miningPos) {
      this.memory.miningPos = energySourceService.findFreeContainerInSource(src);
    }
    return this.memory.miningPos;
  }

  private getMiningSrc(): ISource {
    if (!this.memory.miningSite) {
      this.memory.miningSite = energySourceService.getNextEnergySourceInRoom(this.creep.room);
    }

    return Game.getObjectById<ISource>(this.memory.miningSite);
  }
}

export { CMiner };
