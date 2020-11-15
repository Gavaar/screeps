import { nameService } from '@common/name_creator.service';
import { CMiner } from './creep_miner';
import { CreepType } from './creep.interface';
import { AbstractCreep } from './_creep.abstract';
import { CCollector } from './creep_collector';
import { CBuilder } from './creep_builder';

const typeClassMap = {
  [CreepType.Miner]: CMiner,
  [CreepType.Collector]: CCollector,
  [CreepType.Builder]: CBuilder,
}

class CreepService {
  getMyCreepsInRoom(room: IRoom): { [creepName: string]: AbstractCreep<any> } {
    return room.find<ICreep<any>>(FIND_MY_CREEPS).reduce((creepMap, creep) => {
      const creepOpts = { name: nameService.createName() };
      const { type } = Memory.creep[creep.name] as { type: CreepType };
      const creepClass = typeClassMap[type];

      creepMap[creep.name] = new creepClass(creep, creepOpts);
      return creepMap;
    }, {} as { [creepName: string]: AbstractCreep<any> })
  }
}

const creepService = new CreepService();
export { creepService };
