import { AbstractCreep } from './models/_creep.abstract';

enum CreepType {
  Miner = 'miner',
  Collector = 'collector',
  Builder = 'builder',
  Upgrader = 'upgrader',
}

interface RequiredCreeps {
  [CreepType.Miner]: number,
  [CreepType.Collector]: number,
  [CreepType.Builder]: number,
  [CreepType.Upgrader]: number,
}

export { CreepType, RequiredCreeps }
