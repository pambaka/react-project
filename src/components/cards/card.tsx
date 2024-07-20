import './card.css';
import { ReactNode, useState } from 'react';
import { Character } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from '../../app/store';
import getCharacterId from './get-character-id';
import { addToSelected, removeFromSelected } from '../../app/selected-cards-slice';

function Card({ char }: { char: Character }): ReactNode {
  const selectedCards = store.getState().selectedCards.cards;
  const charId = getCharacterId(char.url);
  const [isSelected, setIsSelected] = useState(selectedCards.includes(charId));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function showDetails(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    navigate(`details/${charId}/?${searchParams.toString()}`);
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setIsSelected(!isSelected);

    const card: HTMLElement | null = event.currentTarget.parentElement;
    if (!card) return;

    if (event.currentTarget.checked) dispatch(addToSelected({ id: card.id }));
    else dispatch(removeFromSelected({ id: card.id }));
  }

  return (
    <div id={charId} className="card" onClick={showDetails}>
      <h2 className="card__title">{char.name}</h2>
      <div className="card__description">
        <p>
          height: <span>{char.height}</span>
        </p>
        <p>
          eyes: <span>{char.eye_color}</span>
        </p>
      </div>
      <input
        className="card__checkbox"
        type="checkbox"
        onClick={(event) => {
          event.stopPropagation();
        }}
        checked={isSelected}
        onChange={handleCheckboxChange}
      ></input>
    </div>
  );
}

export default Card;
