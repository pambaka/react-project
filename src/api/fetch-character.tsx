import { URLS } from '../consts';
import { Character } from '../types';

async function fetchCharacter(id: string): Promise<Character | undefined> {
  let response: Character | undefined;

  await fetch(`${URLS.people}/${id}`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data: Character | undefined) => {
      console.log(data);
      response = data;
    })
    .catch((error) => console.error(error));

  return response;
}

export default fetchCharacter;
