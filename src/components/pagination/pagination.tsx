import './pagination.css';
import React, { ReactNode, useEffect, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { PARAM } from '../../consts';
import getValidPageNumber from '../../utils/get-valid-page-number';

function Pagination({
  isNextDisabled,
  isPrevDisabled,
}: {
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get(PARAM.page);
    return getValidPageNumber(page);
  });

  useEffect(() => {
    const page = searchParams.get(PARAM.page);
    setCurrentPage(getValidPageNumber(page));
  }, [searchParams]);

  function updateCurrentPageNumber(action: PageAction) {
    const page = searchParams.get(PARAM.page);
    const prevPage = getValidPageNumber(page);

    const newPage = changeCurrentPageNumber(prevPage, action);

    const searchValue = searchParams.get(PARAM.search) ?? '';

    setSearchParams({ [PARAM.search]: searchValue, [PARAM.page]: `${newPage}` });
  }

  function showPreviousPage(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    updateCurrentPageNumber('decrement');
  }

  function showNextPage(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    updateCurrentPageNumber('increment');
  }

  return (
    <div className="pagination">
      <Button buttonText="<" callback={showPreviousPage} isDisabled={isPrevDisabled} />
      <p>{currentPage}</p>
      <Button buttonText=">" callback={showNextPage} isDisabled={isNextDisabled} />
    </div>
  );
}

export default Pagination;
