import './flyout.css';
import { useSelector } from 'react-redux';
import { StoreRootState } from '../../app/store';
import { ReactNode } from 'react';

function Flyout(): ReactNode {
  const selectedCards = useSelector<StoreRootState, string[]>((state) => state.selectedCards.cards);
  const isFlyoutVisible = Boolean(selectedCards.length);

  if (isFlyoutVisible)
    return (
      <div className="flyout">
        <p>
          Selected cards: <span>{selectedCards.length}</span>
        </p>
      </div>
    );
  else return null;
}

export default Flyout;
