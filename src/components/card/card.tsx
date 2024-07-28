import './card.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Character } from '../../types';
import Loader from '../loader/loader';
import CardDetails from '../card-details/card-details';
import api from '../../api/api';

function Card(): ReactNode {
  const { charId } = useParams();
  const [charData, setCharData]: [Character | undefined, Dispatch<SetStateAction<Character | undefined>>] = useState();

  const { data, isFetching } = api.useGetCharacterQuery(charId);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setCharData(data);
  }, [data]);

  function closeCard() {
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <>
      <div className="card-detailed">
        <CardDetails char={charData} />
        <button className="close-button" aria-label="Close card button" title="close" onClick={closeCard}></button>
        <Loader isLoading={isFetching}></Loader>
      </div>
    </>
  );
}

export default Card;
