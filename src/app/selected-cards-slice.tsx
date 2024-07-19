import { createSlice } from '@reduxjs/toolkit';

const initialState: { cards: string[] } = { cards: [] };

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addToSelected(state, action: { payload: { id: string } }) {
      const charId = action.payload?.id ?? '';
      if (charId) {
        const updatedCards = [...state.cards, charId];
        state.cards = updatedCards;
      }
    },
  },
});

export const { addToSelected } = selectedCardsSlice.actions;
