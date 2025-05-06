import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://marathon-api.clevertec.ru/';

export const healthApi = createApi({
    reducerPath: 'healthApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getHealth: builder.query<string, void>({
            query: () => 'health',
        }),
    }),
});

export const { useGetHealthQuery } = healthApi;
