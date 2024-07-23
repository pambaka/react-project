import { URLS } from '../consts';

function getCharacterId(url: string): string {
  return url.split(`${URLS.people}/`)[1].replace('/', '');
}

export default getCharacterId;
