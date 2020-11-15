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
}

export { CreepType, RequiredCreeps }
