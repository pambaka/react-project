import './App.css';
import { Component, ReactNode } from 'react';
import SearchSection from './search-section/search-section';
import ResultsSection from './results-section/results-section';
import { SEARCH_VALUE, URL } from './consts';
import { Character } from './types';
import Loader from './loader/loader';

class App extends Component {
  state: { people: Character[] | undefined } = { people: undefined };

  getPeople = async (searchValue: string | null = '') => {
    const searchQuery = searchValue ? `/?search=${searchValue.trim()}` : '';

    Loader.show();

    await fetch(`${URL.people}${searchQuery}`)
      .then((res) => {
        console.log(res);
        if (!res.ok) return undefined;
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) this.setState({ people: data.results });
      })
      .catch((error) => {
        console.log(error);
        Loader.hide();
      });
  };

  componentDidMount(): void {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    this.getPeople(searchValue);
  }

  componentDidUpdate(): void {
    Loader.hide();
  }

  render(): ReactNode {
    return (
      <>
        <SearchSection fetchData={this.getPeople} />
        <ResultsSection results={this.state.people} />
        <Loader></Loader>
      </>
    );
  }
}

export default App;
