import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { buildQueryString } from '~/utils/buildQueryString';

import { API_URL } from '../constants/apiConstant';
import { Recipe } from '../types/recipe';
import { GetRecipesAllParams, GetRecipesCategorFetch, RecipeResponse } from '../types/responce';

export const recipesApi = createApi({
    reducerPath: 'RecipesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getRecipes: builder.query<RecipeResponse, GetRecipesAllParams>({
            query: (params) => {
                const queryString = buildQueryString(params);
                return `recipe?${queryString}`;
            },
        }),

        getRecipeId: builder.query<Recipe, string>({
            query: (idRecipe) => `recipe/${idRecipe}`,
        }),

        getRecipeFromCategor: builder.query<RecipeResponse, GetRecipesCategorFetch>({
            query: ({ idCategor, params }) => {
                const queryString = buildQueryString(params);
                return `recipe/category/${idCategor}?${queryString}`;
            },
        }),
    }),
});

export const { useGetRecipesQuery, useGetRecipeIdQuery, useGetRecipeFromCategorQuery } = recipesApi;
