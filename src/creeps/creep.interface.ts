enum CreepType {
  Refiller = 'refiller',
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
  [CreepType.Refiller]: number,
}

export { CreepType, RequiredCreeps }
