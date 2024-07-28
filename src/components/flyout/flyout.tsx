import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreRootState } from '../../app/store';
import { ReactNode } from 'react';
import Button from '../button/button';
import { unselectAll } from '../../app/selected-cards-slice';
import getCsvFile from '../../utils/get-csv-file';
import { Character } from '../../types';
import { Link } from 'react-router-dom';

function Flyout(): ReactNode {
  const selectedCards = useSelector<StoreRootState, Character[]>((state) => state.selectedCards.cards);
  const isFlyoutVisible = Boolean(selectedCards.length);

  const dispatch = useDispatch();

  function getUrl(): string {
    const csvData = getCsvFile(selectedCards);
    const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    return url;
  }

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
          />
          <Link to={getUrl()} download={`${selectedCards.length}_characters.csv`}>
            <Button
              buttonText="Download"
              callback={(event) => {
                event.stopPropagation();
              }}
            />
          </Link>
        </div>
      </div>
    );
  else return null;
}

export default Flyout;
