import { configureStore } from '@reduxjs/toolkit';
import api from '../api/api';
import { selectedCardsSlice } from './selected-cards-slice';

const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export default store;
