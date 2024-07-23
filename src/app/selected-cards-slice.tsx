import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types';
import getCharacterId from '../utils/get-character-id';

const initialState: { cards: Character[] } = { cards: [] };

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addToSelected(state, action: { payload: { char: Character } }) {
      const newChar = action.payload?.char;
      if (!newChar) return;

      const updatedCards = [...state.cards, newChar];
      state.cards = updatedCards;
    },
    removeFromSelected(state, action: { payload: { id: string } }) {
      const charId = action.payload?.id;
      if (!charId) return;

      const index = state.cards.findIndex((char) => getCharacterId(char.url) === charId);
      if (index === -1) return;

      const updatedCards = [...state.cards];
      updatedCards.splice(index, 1);
      state.cards = updatedCards;
    },
    unselectAll(state) {
      state.cards.length = 0;
    },
  },
});

export const { addToSelected, removeFromSelected, unselectAll } = selectedCardsSlice.actions;
