import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { buildQueryString } from '~/utils/buildQueryString';

import { API_URL } from '../constants/apiConstant';
import { Recipe } from '../types/recipe';
import {
    GetMeasureUnitsResponse,
    GetRecipesAllParams,
    GetRecipesCategorFetch,
    RecipeResponse,
} from '../types/responce';

export const recipesApi = createApi({
    reducerPath: 'RecipesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Accept', 'application/json');
            return headers;
        },

        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, GetRecipesAllParams>({
            query: (params) => {
                const queryString = buildQueryString(params);
                return `recipe?${queryString}`;
            },
        }),

        getRecipeById: builder.query<Recipe, string>({
            query: (idRecipe) => `recipe/${idRecipe}`,
        }),

        getRecipeFromCategor: builder.query<RecipeResponse, GetRecipesCategorFetch>({
            query: ({ idCategor, params }) => {
                const queryString = buildQueryString(params);
                return `recipe/category/${idCategor}?${queryString}`;
            },
        }),

        getMeasureUnits: builder.query<GetMeasureUnitsResponse, object>({
            query: () => 'measure-units',
        }),

        imageUpload: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file, file.name);
                return {
                    url: 'file/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipeFromCategorQuery,
    useGetMeasureUnitsQuery,
    useImageUploadMutation,
} = recipesApi;
