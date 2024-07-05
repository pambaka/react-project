import './results-section.css';
import Cards from '../cards/cards';
import { Character } from '../types';
import { Component, ReactNode } from 'react';

class ResultsSection extends Component<{ results: Character[] }> {
  render(): ReactNode {
    return (
      <section className="results-section">
        <Cards people={this.props.results}></Cards>
      </section>
    );
  }
}

export default ResultsSection;
