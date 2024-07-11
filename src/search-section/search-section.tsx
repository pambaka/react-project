import './search-section.css';
import { ChangeEvent, ReactNode, useState } from 'react';
import Button from '../button/button';
import useLocalStorage from '../hooks/use-local-storage';

function SearchSection(props: { fetchData: (value: string | undefined) => Promise<void> }): ReactNode {
  const [searchValue, setSearchValue] = useLocalStorage();
  const [inputValue, setInputValue] = useState(searchValue);

  const handleClick = async () => {
    setSearchValue(inputValue);

    await props.fetchData(inputValue);
  };

  const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement) setInputValue(event.target.value);
  };

  return (
    <>
      <section className="search-section">
        <input className="search-input" type="text" value={inputValue} onChange={handleChange}></input>
        <Button
          buttonText={'Search'}
          callback={() => {
            handleClick().catch(() => {});
          }}
        />
      </section>
    </>
  );
}

export default SearchSection;
