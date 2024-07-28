import { describe, expect, it } from 'vitest';
import FallbackUi from '../components/fallback-ui/fallback-ui';
import { render, screen } from '@testing-library/react';

describe('Not found page', () => {
  it('', () => {
    render(<FallbackUi />);

    const message = screen.getByText('Something went wrong, please reload the page');
    expect(message).toBeDefined();
  });
});
