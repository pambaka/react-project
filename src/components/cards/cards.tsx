import './cards.css';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToSelected, removeFromSelected } from '../../app/selected-cards-slice';

function Cards(props: { people: Character[] | undefined }): ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addCard(char: Character): ReactNode {
    function showDetails(event: React.MouseEvent<HTMLElement>) {
      event.stopPropagation();
      navigate(`details/${getCharId(char.url)}/?${searchParams.toString()}`);
    }

    function getCharId(url: string): string {
      const id: string = url.split('people/')[1].replace('/', '');
      return id;
    }

    function handleCheckboxClick(event: React.MouseEvent<HTMLInputElement>): void {
      event.stopPropagation();

      const card: HTMLElement | null = event.currentTarget.parentElement;
      if (!card) return;

      if (event.currentTarget.checked) dispatch(addToSelected({ id: card.id }));
      else dispatch(removeFromSelected({ id: card.id }));
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
        <input className="card__checkbox" type="checkbox" onClick={handleCheckboxClick}></input>
      </div>
    );
  }

  return <>{props.people && props.people.map((char: Character) => addCard(char))}</>;
}

export default Cards;
