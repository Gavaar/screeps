enum CreepType {
  Miner = 'miner',
  Collector = 'collector',
  Builder = 'builder',
}

interface RequiredCreeps {
  [CreepType.Miner]: number,
  [CreepType.Collector]: number,
  [CreepType.Builder]: number,
}

export { CreepType, RequiredCreeps }
