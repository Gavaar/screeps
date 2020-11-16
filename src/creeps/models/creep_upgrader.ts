import { CleanOnDeath, CreepType } from '../creep.interface';
import { AbstractCreep, CreepOptions } from './_creep.abstract';
import { roomService } from '@rooms/room.service';

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

  private collect(): void {
    const target = this.getEnergyTarget();
    const transfer = this.creep.withdraw(target, RESOURCE_ENERGY);

    if (transfer === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (transfer === ERR_FULL) this.toggleState();
  }

  private upgrade(): void {
    const target = this.getController();
    const upgrade = this.creep.upgradeController(target);

    if (upgrade === ERR_NOT_IN_RANGE) this.creep.moveTo(target.pos, { visualizePathStyle: {} });
    if (upgrade === ERR_NOT_ENOUGH_RESOURCES) this.toggleState();
  }

  private getEnergyTarget(): IResource {
    if (!this.memory.target) {
      const storages = roomService.getRoomStorages(this.creep.room);
      this.memory.target = storages[storages.length - 1].id; // fullest
    }

    return Game.getObjectById<IResource>(this.memory.target);
  }

  private getController(): IController {
    if (!this.memory.target) {
      this.memory.target = this.room.controller.id;
    }

    return Game.getObjectById<IController>(this.memory.target);
  }

  private toggleState() {
    this.memory.target = '';
    this.memory.state = (this.memory.state === 'upgrading' ? 'collecting' : 'upgrading');
  }
}

export { CUpgrader };
