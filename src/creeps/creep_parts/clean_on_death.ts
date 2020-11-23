/* Decorator to clean Data on Death */
function CleanOnDeath(onDeathFn = (creep?: any) => null as any) {
  return <T extends new (...args: any[]) => any>(ctor: T) => {
    const newCreep = class extends ctor {
      constructor(...args: any[]) {
        super(...args);
        this.run = () => {
          super.run();
          if (this.creep.ticksToLive <= 50) {
            this.creep.say('⚰️', true);
          }
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

export { CleanOnDeath }
