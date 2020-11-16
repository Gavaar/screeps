import { CMiner } from './models/creep_miner';
import { CreepType } from './creep.interface';
import { AbstractCreep } from './models/_creep.abstract';
import { CCollector } from './models/creep_collector';
import { CBuilder } from './models/creep_builder';
import { CUpgrader } from './models/creep_upgrader';

const typeClassMap = {
  [CreepType.Miner]: CMiner,
  [CreepType.Collector]: CCollector,
  [CreepType.Builder]: CBuilder,
  [CreepType.Upgrader]: CUpgrader,
}

class CreepService {
  getMyCreepsInRoom(room: IRoom): { [creepName: string]: AbstractCreep<any> } {
    return room.find<ICreep<any>>(FIND_MY_CREEPS).reduce((creepMap, creep) => {
      const creepOpts = { name: creep.name };
      const { type } = creep.memory as { type: CreepType };
      const creepClass = typeClassMap[type];

      creepMap[creep.name] = new creepClass(creep, creepOpts);
      return creepMap;
    }, {} as { [creepName: string]: AbstractCreep<any> })
  }
}

const creepService = new CreepService();
export { creepService };
