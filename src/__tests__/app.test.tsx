import App from '../App';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../app/store';

describe('App', () => {
  it('Theme buttons change theme', () => {
    render(
      <Provider store={store}>
        <div data-testid="testId">
          <App />
        </div>
      </Provider>,
    );

    const darkButton = screen.getByRole('radio', { name: 'dark theme button' });
    fireEvent.click(darkButton);

    const div = screen.getByTestId('testId');
    const themeDiv = div.firstElementChild;
    expect(themeDiv).toBeInstanceOf(HTMLDivElement);
    if (themeDiv instanceof HTMLDivElement) expect(themeDiv.className).toBe('dark-theme');
  });
});
