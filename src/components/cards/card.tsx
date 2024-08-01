import './card.css';
import { ReactNode, useEffect, useState } from 'react';
import { Character } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StoreRootState } from '../../app/store';
import getCharacterId from '../../utils/get-character-id';
import { addToSelected, removeFromSelected } from '../../app/selected-cards-slice';
import isCardSelected from '../../utils/is-card-selected';

function Card({ char }: { char: Character }): ReactNode {
  const selectedCards = useSelector<StoreRootState, Character[]>((state) => state.selectedCards.cards);
  const charId = getCharacterId(char.url);
  const [isSelected, setIsSelected] = useState(isCardSelected(selectedCards, charId));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSelected(isCardSelected(selectedCards, charId));
  }, [selectedCards, charId]);

  function showDetails(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    navigate(`details/${charId}/?${searchParams.toString()}`);
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setIsSelected(!isSelected);

    const card: HTMLElement | null = event.currentTarget.parentElement;
    if (!card) return;

    if (event.currentTarget.checked) dispatch(addToSelected({ char }));
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
