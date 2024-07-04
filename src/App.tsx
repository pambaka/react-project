import './App.css';
import { Component } from 'react';
import SearchSection from './search-section/search-section';
import ResultsSection from './results-section/results-section';

class App extends Component {
  render() {
    return (
      <>
        <SearchSection />
        <ResultsSection />
      </>
    );
  }
}

export default App;
