import { Dispatch, ReactNode, useEffect, useState } from 'react';
import { Character } from '../../types';
import fetchPeople from '../../api/fetch-people';
import isPageButtonDisabled from '../../components/pagination/is-page-button-disabled';
import { PARAM, SEARCH_VALUE } from '../../consts';
import SearchSection from '../../components/search-section/search-section';
import ResultsSection from '../../components/results-section/results-section';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';
import { useSearchParams } from 'react-router-dom';

function MainPage(): ReactNode {
  const [people, setPeople]: [Character[] | undefined, Dispatch<Character[] | undefined>] = useState<
    Character[] | undefined
  >(undefined);
  const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isPageReloaded, setIsPageReloaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

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
    if (isPageReloaded) return;

    setIsPageReloaded(true);

    let searchValue: string | undefined;

    const search = searchParams.get(PARAM.search);
    const page = searchParams.get(PARAM.page);
    if (page === '0') {
      searchParams.delete(PARAM.page);
      setSearchParams(searchParams);
    }

    if (!search && !page) {
      searchValue = localStorage.getItem(SEARCH_VALUE) ?? '';
      if (searchValue) setSearchParams({ [PARAM.search]: searchValue });
    } else searchValue = search ?? '';

    getPeople(searchValue, Number(page) ? Number(page) : undefined).catch(() => {});
  }, [isPageReloaded, searchParams, setSearchParams]);

  return (
    <>
      <SearchSection fetchData={getPeople} />
      <ResultsSection results={people} />
      <Pagination fetchData={getPeople} isNextDisabled={isNextDisabled} isPrevDisabled={isPrevDisabled}></Pagination>
      <Loader isLoading={isLoading}></Loader>
    </>
  );
}

export default MainPage;
