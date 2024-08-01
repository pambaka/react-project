import { Character } from '../../types';
import { ReactNode } from 'react';
import Card from './card';
import getCharacterId from '../../utils/get-character-id';

function Cards(props: { people: Character[] | undefined }): ReactNode {
  return (
    <>
      {props.people && props.people.map((char: Character) => <Card key={getCharacterId(char.url)} char={char}></Card>)}
    </>
  );
}

export default Cards;
