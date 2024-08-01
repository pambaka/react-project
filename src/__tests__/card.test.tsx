import Card from '../components/cards/card';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';
import { BrowserRouter } from 'react-router-dom';
import { getChar } from './mocks';

const charId: number = 123;

describe('Card component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <div data-testid="testId">
          <Card char={getChar(charId)}></Card>
        </div>
      </BrowserRouter>
    </Provider>,
  );

  it('The card component renders the relevant card data', () => {
    const title = screen.getByText('someName');
    expect(title).toBeDefined();
  });

  it('Clicking on a card opens a detailed card component', () => {
    const div = screen.getByTestId('testId');
    const card = div.firstElementChild;
    expect(card).toBeInstanceOf(HTMLDivElement);
    if (card instanceof HTMLDivElement) {
      fireEvent.click(card);
      expect(location.pathname).toBe(`/details/${charId}/`);
    }
  });
});
