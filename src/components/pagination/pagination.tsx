import './pagination.css';
import React, { ReactNode, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { PARAM } from '../../consts';
import isValidPageNumber from '../../utils/is-valid-page-number';

function Pagination(props: { isNextDisabled: boolean; isPrevDisabled: boolean }): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get(PARAM.page);
    return isValidPageNumber(page) ? Number(page) : 1;
  });

  function updateCurrentPage(prevPage: number, action: PageAction) {
    const newPage = changeCurrentPageNumber(prevPage, action);

    const searchValue = searchParams.get(PARAM.search) ?? '';

    setSearchParams({ [PARAM.search]: searchValue, [PARAM.page]: `${newPage}` });
    return newPage;
  }

  function showPreviousPage(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setCurrentPage((prevPage) => updateCurrentPage(prevPage, 'decrement'));
  }

  function showNextPage(event: React.MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setCurrentPage((prevPage) => updateCurrentPage(prevPage, 'increment'));
  }

  return (
    <div className="pagination">
      <Button buttonText="<" callback={showPreviousPage} isDisabled={props.isPrevDisabled} />
      <p>{currentPage}</p>
      <Button buttonText=">" callback={showNextPage} isDisabled={props.isNextDisabled} />
    </div>
  );
}

export default Pagination;
