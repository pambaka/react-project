import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URLS } from '../consts';
import { Character, SwResponse } from '../types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.people }),
  endpoints: (builder) => ({
    getCharacter: builder.query<Character | undefined, string | undefined>({
      query: (id) => `/${id}`,
    }),
    getSearched: builder.query<SwResponse | undefined, { searchValue: string | null; pageNumber?: string | null }>({
      query: ({ searchValue, pageNumber }) => {
        let searchQuery = '/?search=';
        searchQuery += searchValue ? `${searchValue.trim()}` : '';
        searchQuery += pageNumber ? `&page=${pageNumber}` : '';
        return searchQuery;
      },
    }),
  }),
});

export default api;
