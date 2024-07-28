import { render, screen } from '@testing-library/react';
import ThemeButton from '../components/theme-button/theme-button';
import { describe, expect, it } from 'vitest';

describe('Theme button component', () => {
  it('Theme buttons are rendered', () => {
    render(<ThemeButton />);

    const lightButton = screen.getByRole('radio', { name: 'light theme button' });
    expect(lightButton).toBeInstanceOf(HTMLInputElement);
  });
});
