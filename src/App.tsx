import './App.css';
import { Dispatch, ReactNode, useEffect, useState } from 'react';
import SearchSection from './components/search-section/search-section';
import ResultsSection from './components/results-section/results-section';
import { SEARCH_VALUE } from './consts';
import { Character } from './types';
import Loader from './components/loader/loader';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';
import Pagination from './components/pagination/pagination';
import fetchPeople from './api/fetch-people';
import isPageButtonDisabled from './components/pagination/is-page-button-disabled';

function App(): ReactNode {
  const [people, setPeople]: [Character[] | undefined, Dispatch<Character[] | undefined>] = useState<
    Character[] | undefined
  >(undefined);
  const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const getPeople = async (searchValue: string | null = '', pageNumber?: number) => {
    try {
      setIsLoading(true);

      const response = await fetchPeople(searchValue, pageNumber);
      setIsNextDisabled(isPageButtonDisabled(response?.next));
      setIsPrevDisabled(isPageButtonDisabled(response?.previous));

      const people = response?.results ?? undefined;
      setPeople(people);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    getPeople(searchValue).catch(() => {});
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<FallbackUi />}>
        <SearchSection fetchData={getPeople} />
        <ResultsSection results={people} />
        <Pagination fetchData={getPeople} isNextDisabled={isNextDisabled} isPrevDisabled={isPrevDisabled}></Pagination>
        <Loader isLoading={isLoading}></Loader>
      </ErrorBoundary>
    </>
  );
}

export default App;
