import ResultsSection from '../components/results-section/results-section';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Character } from '../types';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import store from '../app/store';
import { getChar } from './mocks';

describe('Results section component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('An appropriate message is displayed if no cards are present', () => {
    const results: Character[] = [];
    render(<ResultsSection results={results}></ResultsSection>);
    const message = screen.getByText('Nothing was found :(');
    expect(message).toBeInstanceOf(HTMLDivElement);
  });

  it('The component renders the specified number of cards', () => {
    const results: Character[] = [];
    const numberOfChar = Math.ceil(Math.random() * 10);
    for (let i = 0; i < numberOfChar; i += 1) {
      results.push(getChar(i));
    }

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<ResultsSection results={results}></ResultsSection>}></Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const cards = screen.getAllByText('someName');
    expect(cards.length).toBe(numberOfChar);
  });
});
