import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SEARCH_VALUE } from '../consts';

function useLocalStorage(): [string, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(SEARCH_VALUE) ?? '';
  });

  const valueRef = useRef('');
  valueRef.current = value;

  const saveToLocalSrorage = () => {
    localStorage.setItem(SEARCH_VALUE, valueRef.current);
  };

  useEffect(() => saveToLocalSrorage, [value]);

  return [value, setValue];
}

export default useLocalStorage;
