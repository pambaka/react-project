import './card.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';
import fetchCharacter from '../../api/fetch-character';
import { Character } from '../../types';
import Loader from '../loader/loader';
import CardDetails from '../card-details/card-details';

function Card(): ReactNode {
  const { charId } = useParams();
  const [charData, setCharData]: [Character | undefined, Dispatch<SetStateAction<Character | undefined>>] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getCharacter = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        if (charId) {
          const data = await fetchCharacter(id);
          setCharData(data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [charId],
  );

  useEffect(() => {
    const wrapper = async () => {
      if (charId) await getCharacter(charId);
    };
    wrapper().catch(() => {});
  }, [charId, getCharacter]);

  function closeCard() {
    navigate(`/?${searchParams.toString()}`);
  }

  return (
    <>
      <div className="card-detailed">
        <CardDetails char={charData} />
        <button className="close-button" aria-label="Close card button" title="close" onClick={closeCard}></button>
        <Loader isLoading={isLoading}></Loader>
      </div>
    </>
  );
}

export default Card;
