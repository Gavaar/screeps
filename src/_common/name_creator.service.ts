const nameHash = ['Fran', 'Juan', 'Pedro', 'Angel', 'Roman', 'Marquito'];

function getName(): string {
  return nameHash[Math.floor(Math.random() * nameHash.length)];
}

class NameCreatorService {
  id = Memory.id || 0;

  createName(): string {
    Memory.id = this.id + 1;
    return `${getName()}_${this.id}`;
  }
}
const nameService = new NameCreatorService();

export { nameService };
