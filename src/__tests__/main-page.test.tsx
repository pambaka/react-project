import { describe, expect, it } from 'vitest';
import MainPage from '../pages/main/main-page';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/store';

describe('Main page', () => {
  it('', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});
