import { configureStore, createSlice } from '@reduxjs/toolkit';
import { URLS } from '../consts';
import { Character } from '../types';

export const mockChar: Character = {
  name: 'someName',
  height: 'someHeight',
  mass: 'someMass',
  hair_color: 'someColor',
  eye_color: 'someColor',
  skin_color: 'someColor',
  url: `${URLS.people}/1`,
};

export function getChar(id: number): Character {
  return {
    name: 'someName',
    height: 'someHeight',
    mass: 'someMass',
    hair_color: 'someColor',
    eye_color: 'someColor',
    skin_color: 'someColor',
    url: `${URLS.people}/${id}`,
  };
}

const initialState: { cards: Character[] } = { cards: [mockChar] };
const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {},
});

export const mockStore = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice.reducer,
  },
});
