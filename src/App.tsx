import './App.css';
import { Component, ReactNode } from 'react';
import SearchSection from './search-section/search-section';
import ResultsSection from './results-section/results-section';
import { SEARCH_VALUE, URL } from './consts';
import { Character } from './types';
import Loader from './loader/loader';
import ErrorBoundary from './error-boundary';
import ErrorButton from './error-button/error-button';
import FallbackUi from './fallback-ui/fallback-ui';

class App extends Component {
  state: { people: Character[] | undefined } = { people: undefined };

  getPeople = async (searchValue: string | null = '') => {
    const searchQuery = searchValue ? `/?search=${searchValue.trim()}` : '';

    Loader.show();

    await fetch(`${URL.people}${searchQuery}`)
      .then((res) => {
        if (!res.ok) return undefined;
        return res.json();
      })
      .then((data: { results: Character[] } | undefined) => {
        if (data) this.setState({ people: data.results });
      })
      .catch(() => {
        Loader.hide();
      });
  };

  async componentDidMount(): Promise<void> {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    await this.getPeople(searchValue);
  }

  componentDidUpdate(): void {
    Loader.hide();
  }

  render(): ReactNode {
    return (
      <>
        <ErrorBoundary fallback={<FallbackUi />}>
          <SearchSection fetchData={this.getPeople} />
          <ResultsSection results={this.state.people} />
          <ErrorButton buttonText="" callback={() => {}}></ErrorButton>
          <Loader></Loader>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
