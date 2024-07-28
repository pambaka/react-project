import './search-section.css';
import { ChangeEvent, ReactNode, useState } from 'react';
import Button from '../button/button';
import useLocalStorage from '../../hooks/use-local-storage';
import { useSearchParams } from 'react-router-dom';
import { PARAM } from '../../consts';
import isValidPageNumber from '../../utils/is-valid-page-number';

function SearchSection(): ReactNode {
  const [searchValue, setSearchValue] = useLocalStorage();

  const [searchParams, setSearchParams] = useSearchParams({});

  const [inputValue, setInputValue] = useState(() => {
    const search = searchParams.get(PARAM.search);
    const page = searchParams.get(PARAM.page);
    if (!search && !isValidPageNumber(page)) return searchValue;
    else return search ?? '';
  });

  const handleClick = () => {
    setSearchValue(inputValue);
    setSearchParams({ search: inputValue });
  };

  const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) setInputValue(event.target.value);
  };

  return (
    <>
      <section className="search-section">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
          }}
        ></input>
        <Button
          buttonText={'Search'}
          callback={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            handleClick();
          }}
        />
      </section>
    </>
  );
}

export default SearchSection;
