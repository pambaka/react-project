import { render, screen } from '@testing-library/react';
import SearchSection from '../components/search-section/search-section';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const fetchData = vi.fn(() => Promise.resolve());
const SEARCH_VALUE = 'searchValue';
const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

describe('Search section component', () => {
  it('the component retrieves the value from the local storage upon mounting', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<SearchSection fetchData={fetchData} />}></Route>
        </Routes>
      </MemoryRouter>,
    );

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInstanceOf(HTMLButtonElement);

    expect(getItemSpy).toHaveBeenCalledWith(SEARCH_VALUE);
  });
});
