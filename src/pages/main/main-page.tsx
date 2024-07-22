import './main-page.css';
import { ReactNode, useEffect, useState } from 'react';
import isPageButtonDisabled from '../../components/pagination/is-page-button-disabled';
import { PARAM, SEARCH_VALUE } from '../../consts';
import SearchSection from '../../components/search-section/search-section';
import ResultsSection from '../../components/results-section/results-section';
import Pagination from '../../components/pagination/pagination';
import Loader from '../../components/loader/loader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Flyout from '../../components/flyout/flyout';
import api from '../../api/api';
import isValidPageNumber from '../../utils/is-valid-page-number';

function MainPage(): ReactNode {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isPageReloaded, setIsPageReloaded] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: response, isFetching } = api.useGetSearchedQuery({
    searchValue: searchParams.get(PARAM.search),
    pageNumber: searchParams.get(PARAM.page),
  });

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(response?.next));
    setIsPrevDisabled(isPageButtonDisabled(response?.previous));
  }, [response]);

  useEffect(() => {
    if (isPageReloaded) return;

    setIsPageReloaded(true);

    let searchValue: string | undefined;

    const search = searchParams.get(PARAM.search);
    const page = searchParams.get(PARAM.page);
    if (!isValidPageNumber(page)) {
      searchParams.delete(PARAM.page);
      setSearchParams(searchParams);
    }

    if (!search && !page) {
      searchValue = localStorage.getItem(SEARCH_VALUE) ?? '';
      if (searchValue) setSearchParams({ [PARAM.search]: searchValue });
    }
  }, [isPageReloaded, searchParams, setSearchParams, response]);

  return (
    <section
      className="main-section"
      onClick={() => {
        navigate(`/?${searchParams.toString()}`);
      }}
    >
      <SearchSection />
      <ResultsSection results={response?.results} />
      <Pagination isNextDisabled={isNextDisabled} isPrevDisabled={isPrevDisabled} />
      <Flyout />
      <Loader isLoading={isFetching} />
    </section>
  );
}

export default MainPage;
