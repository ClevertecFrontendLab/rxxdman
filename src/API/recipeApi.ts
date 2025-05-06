import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://marathon-api.clevertec.ru/';

export type stepRecipe = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type nutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type author = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers?: string[];
};

export type recipe = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: stepRecipe[];
    nutritionValue: nutritionValue;
    ingredients: ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
    authorData: author;
};

export type meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type recipeResponse = {
    data: recipe[];
    meta: meta;
};

export interface GetRecipesAllParams {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    sortBy?: string;
    sortOrder?: string;
}

export const recipesApi = createApi({
    reducerPath: 'RecipesApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getRecipes: builder.query<recipeResponse, GetRecipesAllParams>({
            query: (params) => {
                const queryString = new URLSearchParams(
                    Object.entries(params).filter(([_, v]) => v !== undefined),
                ).toString();
                return `recipe?${queryString}`;
            },
        }),
    }),
});

export const recipeIdApi = createApi({
    reducerPath: 'RecipesIdApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getRecipeId: builder.query<recipe, string>({
            query: (idRecipe) => `recipe/${idRecipe}`,
        }),
    }),
});

export interface GetRecipesCategorParams {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
}

export type GetRecipesCategorFetch = {
    idCategor: string;
    params: GetRecipesCategorParams;
};

export const recipeCategorApi = createApi({
    reducerPath: 'RecipesCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getRecipeCategor: builder.query<recipeResponse, GetRecipesCategorFetch>({
            query: ({ idCategor, params }) => {
                const queryString = new URLSearchParams(
                    Object.entries(params).filter(([_, v]) => v !== undefined),
                ).toString();
                return `recipe/category/${idCategor}?${queryString}`;
            },
        }),
    }),
});

export const { useGetRecipesQuery } = recipesApi; //Рецепты по параметрам
export const { useGetRecipeIdQuery } = recipeIdApi; //Рецепт по ID
export const { useGetRecipeCategorQuery } = recipeCategorApi; //Рецепт по категории
