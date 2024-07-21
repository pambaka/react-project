import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreRootState } from '../../app/store';
import { ReactNode } from 'react';
import Button from '../button/button';
import { unselectAll } from '../../app/selected-cards-slice';

function Flyout(): ReactNode {
  const selectedCards = useSelector<StoreRootState, string[]>((state) => state.selectedCards.cards);
  const isFlyoutVisible = Boolean(selectedCards.length);

  const dispatch = useDispatch();

  if (isFlyoutVisible)
    return (
      <div className="flyout">
        <div>
          <p>
            Selected cards: <span>{selectedCards.length}</span>
          </p>
          <Button
            buttonText="Unselect all"
            callback={(event) => {
              event.stopPropagation();
              dispatch(unselectAll());
            }}
          ></Button>
        </div>
      </div>
    );
  else return null;
}

export default Flyout;
