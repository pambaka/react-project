import './cards.css';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Cards(props: { people: Character[] | undefined }): ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function addCard(char: Character): ReactNode {
    function showDetails(event: React.MouseEvent<HTMLElement>) {
      event.stopPropagation();
      navigate(`details/${getCharId(char.url)}/?${searchParams.toString()}`);
    }

    function getCharId(url: string): string {
      const id: string = url.split('people/')[1].replace('/', '');
      return id;
    }

    return (
      <div id={getCharId(char.url)} className="card" key={getCharId(char.url)} onClick={showDetails}>
        <h2 className="card__title">{char.name}</h2>
        <div className="card__description">
          <p>
            height: <span>{char.height}</span>
          </p>
          <p>
            eyes: <span>{char.eye_color}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{props.people && props.people.map((char: Character) => addCard(char))}</>;
}

export default Cards;
