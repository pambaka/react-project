import getCharacterId from './get-character-id';
import { Character } from '../types';

function isCardSelected(cards: Character[], id: string): boolean {
  const idArr = cards.map((char) => getCharacterId(char.url));
  return idArr.includes(id);
}

export default isCardSelected;
