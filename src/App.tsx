import './App.css';
import { Component } from 'react';
import SearchSection from './search-section/search-section';
import ResultsSection from './results-section/results-section';
import { URL } from './consts';

class App extends Component {
  getPeople = async (searchValue: string = '') => {
    const searchQuery = searchValue ? `/?search=${searchValue}` : '';

    await fetch(`${URL.people}${searchQuery}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <SearchSection fetchData={this.getPeople} />
        <ResultsSection />
      </>
    );
  }
}

export default App;
