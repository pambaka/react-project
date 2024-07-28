import { describe, expect, it } from 'vitest';
import NotFoundPage from '../pages/not-found/not-found-page';
import { render, screen } from '@testing-library/react';

describe('Not found page', () => {
  it('Renders not found page', () => {
    render(<NotFoundPage />);

    const message = screen.getByText('Page not found');
    expect(message).toBeInstanceOf(HTMLHeadingElement);
  });
});
