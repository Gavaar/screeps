import { CMiner } from './models/creep_miner';
import { CreepType, RequiredCreeps } from './creep.interface';
import { AbstractCreep } from './models/_creep.abstract';
import { CCollector } from './models/creep_collector';
import { CBuilder } from './models/creep_builder';
import { CUpgrader } from './models/creep_upgrader';
import { energySourceService } from '@rooms/energy_sources/energy_source.service';
import { CRefiller } from './models/creep_refiller';
import { controllerService } from '@rooms/controller/controller.service';

const typeClassMap = {
  [CreepType.Refiller]: CRefiller,
  [CreepType.Miner]: CMiner,
  [CreepType.Collector]: CCollector,
  [CreepType.Builder]: CBuilder,
  [CreepType.Upgrader]: CUpgrader,
}

const bodyPartMap = {
  [CreepType.Miner]: {
    fixed: [MOVE, WORK],
    repeat: [WORK],
  },
  [CreepType.Collector]: {
    fixed: [MOVE, CARRY],
    repeat: [CARRY, MOVE],
  },
  [CreepType.Builder]: {
    fixed: [WORK, MOVE, MOVE, CARRY],
    repeat: [WORK, MOVE, CARRY, MOVE]
  },
  [CreepType.Upgrader]: {
    fixed: [MOVE, MOVE, CARRY, CARRY, WORK],
    repeat: [MOVE, CARRY, WORK, MOVE],
  },
  [CreepType.Refiller]: {
    fixed: [MOVE, WORK, CARRY, MOVE, CARRY],
    repeat: [WORK, MOVE, CARRY],
  }
};

type BodyPart = 'work' | 'carry' | 'move' | 'attack' | 'heal' | 'ranged_attack' | 'tough' | 'claim';

const PART_PRICE = {
  [WORK]: 100,
  [CARRY]: 50,
  [MOVE]: 50,
  [ATTACK]: 80,
  [HEAL]: 250,
  [RANGED_ATTACK]: 150,
  [TOUGH]: 10,
  [CLAIM]: 600,
};

class CreepService {
  myCreepsInRoom(room: IRoom): { [creepName: string]: AbstractCreep<any> } {
    return room.find<ICreep<any>>(FIND_MY_CREEPS).reduce((creepMap, creep) => {
      const creepOpts = { name: creep.name };
      const { type } = creep.memory as { type: CreepType };
      if (!type) Memory.creeps[creep.name].type = creep.name.split('_')[0];
      const creepClass = typeClassMap[type] || typeClassMap[creep.name.split('_')[0] as CreepType];

      if (!creepClass) {
        // tslint:disable-next-line: no-console
        console.log(`creep ${creep.name} somehow bugged`, creep.memory.type);
        return creepMap;
      }

      creepMap[creep.name] = new creepClass(creep, creepOpts);
      return creepMap;
    }, {} as { [creepName: string]: AbstractCreep<any> })
  }

  creepCapacity(room: IRoom): RequiredCreeps {
    if (room.memory.creepCapacity) return room.memory.creepCapacity;
    room.memory.currentCreeps = { miner: 0, collector: 0, builder: 0, upgrader: 0, refiller: 0 };

    const _customCtrlLevel = controllerService.getCustomCtrlLevel(room);

    const miner = this.calculateMinersNeeded(room);
    const collector = miner;
    const builder = miner + (_customCtrlLevel + 1);
    const upgrader = _customCtrlLevel + 1;
    const refiller = _customCtrlLevel ? 0 : miner;

    const creepCapacity = { miner, collector, builder, upgrader, refiller }
    room.memory.creepCapacity = creepCapacity;
    return creepCapacity;
  }

  nextRequiredCreep(room: IRoom, ctrlLevel: number): CreepType | void {
    const { miner, collector, builder, upgrader, refiller } = this.creepCapacity(room);
    const { currentCreeps } = room.memory;

    switch(ctrlLevel) {
      case 4:
      case 3:
      case 2:
      case 1:
        if ((currentCreeps.miner) < miner &&
            currentCreeps.miner <= currentCreeps.builder) return CreepType.Miner;
        if (currentCreeps.builder < builder &&
          (currentCreeps.builder <= collector || currentCreeps.collector === collector)) {
          return CreepType.Builder;
        }
        if (currentCreeps.collector < collector) return CreepType.Collector;
      case 0:
        if (currentCreeps.refiller < refiller) return CreepType.Refiller;
      default:
        if (currentCreeps.upgrader < upgrader) return CreepType.Upgrader;
        break;
    }
  }

  bodyPartsByCapacity(type: CreepType, capacity: number): string[] {
    const affordableBody: string[] = [];
    const addPart = (part: BodyPart) => {
      capacity -= PART_PRICE[part];
      if (capacity >= 0) affordableBody.push(part);
    }

    bodyPartMap[type].fixed.forEach(part => {
      addPart(part);
    });

    const { repeat } = bodyPartMap[type];
    let repeatableIndex = -1;
    while (capacity >= 0) {
      repeatableIndex += 1;
      const _part = repeat[repeatableIndex % repeat.length];
      addPart(_part);
    }

    return affordableBody;
  }

  private calculateMinersNeeded(room: IRoom): number {
    const enSrcs = energySourceService.getRoomEnergySources(room);
    return Math.ceil(Object.values(enSrcs).reduce((t, s) => t += s.memory.optimalMinerCapacity, 0));
  }
}

const creepService = new CreepService();
export { creepService };
