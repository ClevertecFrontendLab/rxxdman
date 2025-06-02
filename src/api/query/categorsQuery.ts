import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/apiConstant';
import { CategoriesResponse } from '../types/responce';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        },

        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => 'category',
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
