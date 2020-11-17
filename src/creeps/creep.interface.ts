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

/* Decorator to clean Data on Death */
function CleanOnDeath(onDeathFn = (creep?: any) => null as any) {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const newCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
        this.run = () => {
          super.run();
          if (this.creep.ticksToLive === 10) {
            this.creep.room.memory.currentCreeps[this.type] -= 1;
          }
          if (this.creep.ticksToLive <= 1) {
            // tslint:disable-next-line: no-console
            console.log(`${this.name} passed away`);
            onDeathFn(this.creep);
            delete Memory.creeps[this.name];
          }
        }
      }
    }

    return newCreep;
  }
}


export { CreepType, RequiredCreeps, CleanOnDeath }
