import { Character } from '../types';

function getCsvFile(data: Character[]) {
  const csvArr: string[] = [];

  const titles: string = Object.keys(data[0]).join(';');
  csvArr.push(titles);

  const rows = data.map((char) => Object.values(char).join(';'));
  rows.forEach((row) => csvArr.push(row));

  return csvArr.join('\n');
}

export default getCsvFile;
