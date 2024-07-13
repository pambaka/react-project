import './pagination.css';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { PARAM } from '../../consts';

function Pagination(props: {
  fetchData: (searchValue: string, pageNumber?: number) => Promise<void>;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(() => {
    const pageNum = Number(searchParams.get(PARAM.page));
    return pageNum;
  });

  function updateCurrentPage(prevPage: number, action: PageAction) {
    const newPage = changeCurrentPageNumber(prevPage, action);

    const searchValue = searchParams.get(PARAM.search) ?? '';
    if (newPage !== prevPage) {
      const func = async () => {
        await props.fetchData(searchValue, newPage);
      };

      func().catch(() => {});
    }

    setSearchParams({ search: searchValue, page: `${newPage}` });
    return newPage;
  }

  function showPreviousPage() {
    setCurrentPage((prevPage) => updateCurrentPage(prevPage, 'decrement'));
  }

  function showNextPage() {
    setCurrentPage((prevPage) => updateCurrentPage(prevPage, 'increment'));
  }

  useEffect(() => {
    const pageNum = Number(searchParams.get(PARAM.page));
    setCurrentPage(pageNum ? pageNum : 1);
  }, [searchParams]);

  useEffect(() => {});

  return (
    <div className="pagination">
      <Button buttonText="<" callback={showPreviousPage} isDisabled={props.isPrevDisabled} />
      <p>{currentPage}</p>
      <Button buttonText=">" callback={showNextPage} isDisabled={props.isNextDisabled} />
    </div>
  );
}

export default Pagination;
