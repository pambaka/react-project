import { describe, expect, it } from 'vitest';
import Card from '../components/card/card';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import store from '../app/store';
import { Provider } from 'react-redux';

describe('Detailed card component', () => {
  it('Renders detailed card component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });
});
