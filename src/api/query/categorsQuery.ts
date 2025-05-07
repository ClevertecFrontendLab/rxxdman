import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/apiConstant';
import { categoriesResponse } from '../types/responce';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getCategories: builder.query<categoriesResponse, void>({
            query: () => 'category',
        }),
    }),
});

export const { useGetCategoriesQuery } = categoryApi;
