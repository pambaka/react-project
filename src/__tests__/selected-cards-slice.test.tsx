import { describe, expect, it } from 'vitest';
import { selectedCardsSlice } from '../app/selected-cards-slice';
import { Character } from '../types';
import { mockChar, getChar } from './mocks';

describe('Selected cards slice', () => {
  const reducer = selectedCardsSlice.reducer;
  const actions = selectedCardsSlice.actions;

  it('addToSelected action adds selected char to the selected cards array', () => {
    const prevState: { cards: Character[] } = { cards: [] };
    expect(reducer(prevState, actions.addToSelected({ char: mockChar }))).toStrictEqual({ cards: [mockChar] });
  });

  it('removeFromSelected action removes selected char from the selected cards array', () => {
    const prevState: { cards: Character[] } = { cards: [getChar(1), getChar(2)] };
    expect(reducer(prevState, actions.removeFromSelected({ id: '1' }))).toStrictEqual({ cards: [getChar(2)] });
  });

  it('unselectAll action clears the selected cards array', () => {
    const prevState: { cards: Character[] } = { cards: [getChar(1), getChar(2)] };
    expect(reducer(prevState, actions.unselectAll())).toStrictEqual({ cards: [] });
  });
});
