const nameHash = ['fran', 'juan', 'nestor', 'angel', 'roman', 'marquito', 'melchor', 'bata', 'ines', 'josu', 'portu', 'christian', 'gordito', 'chapi', 'pernas', 'messi'];

function getName(): string {
  return nameHash[Math.floor(Math.random() * nameHash.length)];
}

class NameCreatorService {
  id = (Memory.constants || { id: 0 }).id;

  createName(): string {
    Memory.constants.id = this.id + 1;
    return `${getName()}_${this.id}`;
  }
}
const nameService = new NameCreatorService();

export { nameService };
