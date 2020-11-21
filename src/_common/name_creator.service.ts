const nameHash = ['fran', 'juan', 'nestor', 'angel', 'roman', 'marquito', 'melchor', 'bata', 'ines', 'josu', 'portu', 'christian', 'gordito', 'chapi', 'pernas', 'messi'];

function getName(): string {
  return nameHash[Math.floor(Math.random() * nameHash.length)];
}

class NameCreatorService {
  id = Memory.id || 0;

  createName(): string {
    Memory.id = this.id >= 200 ? 0 : (this.id + 1);
    return `${getName()}_${this.id}`;
  }
}
const nameService = new NameCreatorService();

export { nameService };
