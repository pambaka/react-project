import './cards.css';
import { Character } from '../types';
import { Component, ReactNode } from 'react';

class Cards extends Component<{ people: Character[] | undefined }> {
  addCard(char: Character): ReactNode {
    return (
      <div className="card" key={char.name}>
        <h2 className="card__title">{char.name}</h2>
        <div className="card__description">
          <p>
            height: <span>{char.height}</span>
          </p>
          <p>
            mass: <span>{char.mass}</span>
          </p>
          <p>
            hair: <span>{char.hair_color}</span>
          </p>
          <p>
            skin: <span>{char.skin_color}</span>
          </p>
          <p>
            eyes: <span>{char.eye_color}</span>
          </p>
        </div>
      </div>
    );
  }

  render(): ReactNode {
    return <>{this.props.people && this.props.people.map((char: Character) => this.addCard(char))}</>;
  }
}

export default Cards;
