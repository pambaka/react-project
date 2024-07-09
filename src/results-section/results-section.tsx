import './results-section.css';
import Cards from '../cards/cards';
import { Character } from '../types';
import { ReactNode } from 'react';

function ResultsSection(props: { results: Character[] | undefined }): ReactNode {
  function renderContent(res: Character[] | undefined): ReactNode {
    if (!res) return null;
    else if (res.length === 0) return <div className="not-found">Nothing was found :(</div>;
    else return <Cards people={props.results}></Cards>;
  }

  return <section className="results-section">{renderContent(props.results)}</section>;
}

export default ResultsSection;
