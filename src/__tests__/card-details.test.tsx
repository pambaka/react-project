import { describe, expect, it } from 'vitest';
import CardDetails from '../components/card-details/card-details';
import { render, screen } from '@testing-library/react';
import { mockChar } from './mocks';

describe('Card details component', () => {
  it('Renders card details', () => {
    render(<CardDetails char={mockChar} />);

    const title = screen.getByText('someName');
    expect(title).toBeDefined();
  });
});
