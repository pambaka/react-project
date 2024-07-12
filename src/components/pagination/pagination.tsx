import './pagination.css';
import { ReactNode, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import useLocalStorage from '../../hooks/use-local-storage';
import { PageAction } from '../../types';

function Pagination(props: {
  fetchData: (searchValue: string, pageNumber?: number) => Promise<void>;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue] = useLocalStorage();

  function updateCurrentPage(prevPage: number, action: PageAction) {
    const newPage = changeCurrentPageNumber(prevPage, action);

    if (newPage !== prevPage) {
      const func = async () => {
        await props.fetchData(searchValue, newPage);
      };

      func().catch(() => {});
    }

    return newPage;
  }

  function showPreviousPage() {
    setCurrentPage((prevPage) => updateCurrentPage(prevPage, 'decrement'));
  }

  function showNextPage() {
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
