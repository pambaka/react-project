import './search-section.css';
import { ReactNode, useEffect, useRef } from 'react';
import Button from '../button/button';
import { SEARCH_VALUE } from '../consts';

function SearchSection(props: { fetchData: (value: string | undefined) => Promise<void> }): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    const value: string | undefined = inputRef.current?.value;

    if (value) {
      localStorage.setItem(SEARCH_VALUE, value);
    } else {
      localStorage.removeItem(SEARCH_VALUE);
    }

    await props.fetchData(value);
  };

  useEffect(() => {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    if (searchValue && inputRef.current) inputRef.current.value = searchValue;
  }, []);

  return (
    <>
      <section className="search-section">
        <input className="search-input" type="text" ref={inputRef} />
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
