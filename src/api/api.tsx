import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URLS } from '../consts';
import { Character } from '../types';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.people }),
  endpoints: (builder) => ({
    getCharacter: builder.query<Character | undefined, string | undefined>({
      query: (id) => `/${id}`,
    }),
  }),
});

export default api;
