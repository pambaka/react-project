import { ReactNode } from 'react';
import { Character } from '../../types';

function CardDetails(props: { char: Character | undefined }): ReactNode {
  if (!props.char) return <div></div>;

  if (!props.char.name) return <div className="fallback-text">Character not found</div>;

  return (
    <>
      <h2 className="card__title">{props.char.name}</h2>
      <div className="card__description">
        <p>
          height: <span>{props.char.height}</span>
        </p>
        <p>
          mass: <span>{props.char.mass}</span>
        </p>
        <p>
          hair: <span>{props.char.hair_color}</span>
        </p>
        <p>
          skin: <span>{props.char.skin_color}</span>
        </p>
        <p>
          eyes: <span>{props.char.eye_color}</span>
        </p>
      </div>
    </>
  );
}

export default CardDetails;
