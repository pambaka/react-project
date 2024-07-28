import Flyout from '../components/flyout/flyout';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from './mocks';
import { MemoryRouter } from 'react-router-dom';

URL.createObjectURL = vi.fn();

describe('Flyout component', () => {
  it('Flyout component is visible when selected cards array is not empty', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Flyout />
        </MemoryRouter>
      </Provider>,
    );

    const unselectButton = screen.getByRole('button', { name: 'Unselect all' });
    expect(unselectButton).toBeDefined();
  });
});
