import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://marathon-api.clevertec.ru/';

export type subCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type subCategories = subCategory[];

export type category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: subCategories;
    rootCategoryId?: string;
};

export type categories = category[];

type categoryResponce = {
    _id: string;
    title: string;
    category: string;
    icon?: string;
    description?: string;
    subCategories?: subCategories;
    rootCategoryId?: string;
};

export type categoriesResponse = Array<categoryResponce>;

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
