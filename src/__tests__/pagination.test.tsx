import { describe, expect, it } from 'vitest';
import Pagination from '../components/pagination/pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PARAM } from '../consts';

describe('Pagination component', () => {
  it('The component updates URL query parameter when page changes', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagination isNextDisabled={false} isPrevDisabled={false} />}></Route>
        </Routes>
      </BrowserRouter>,
    );

    expect(location.search).toBe('');

    const nextButton = await screen.findByRole('button', { name: '>' });
    fireEvent.click(nextButton);
    expect(new URLSearchParams(location.search).get(PARAM.page)).toBe('2');

    fireEvent.click(nextButton);
    expect(new URLSearchParams(location.search).get(PARAM.page)).toBe('3');

    const prevButton = screen.getByRole('button', { name: '<' });
    fireEvent.click(prevButton);
    expect(new URLSearchParams(location.search).get(PARAM.page)).toBe('2');
  });
});
