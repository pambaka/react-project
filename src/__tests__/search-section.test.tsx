import { fireEvent, render, screen } from '@testing-library/react';
import SearchSection from '../components/search-section/search-section';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const key = 'key';
const getValue = 'testValue1';
const setValue = 'testValue2';
localStorage.setItem(key, getValue);

vi.mock('../hooks/use-local-storage', () => {
  return {
    default: () => [
      localStorage.getItem(key),
      () => {
        localStorage.setItem(key, setValue);
      },
    ],
  };
});

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

describe('Search section component', () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<SearchSection />}></Route>
      </Routes>
    </MemoryRouter>,
  );

  it('The component retrieves the value from the local storage upon mounting', () => {
    expect(getItemSpy).toHaveBeenCalledWith(key);

    const input: HTMLInputElement = screen.getByRole('textbox');
    expect(input.value).toBe(getValue);
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(setItemSpy).toHaveBeenCalledWith(key, setValue);
  });
});
