import { createSlice } from '@reduxjs/toolkit';

const initialState: { cards: string[] } = { cards: [] };

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addToSelected(state, action: { payload: { id: string } }) {
      const charId = action.payload?.id;
      if (charId) {
        const updatedCards = [...state.cards, charId];
        state.cards = updatedCards;
      }
    },
    removeFromSelected(state, action: { payload: { id: string } }) {
      const charId = action.payload?.id;
      if (!charId) return;

      const index = state.cards.findIndex((value) => value === charId);
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
