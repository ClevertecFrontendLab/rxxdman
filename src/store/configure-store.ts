import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoryApi } from '~/API/categorsApi';
import { healthApi } from '~/API/healtApi';
import { recipeCategorApi, recipeIdApi, recipesApi } from '~/API/recipeApi';
import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [healthApi.reducerPath]: healthApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer, //Категории
    [recipesApi.reducerPath]: recipesApi.reducer, //Рецепты
    [recipeIdApi.reducerPath]: recipeIdApi.reducer, //рецепт{id}
    [recipeCategorApi.reducerPath]: recipeCategorApi.reducer, //рецепт по категории
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(healthApi.middleware)
            .concat(categoryApi.middleware) //Категории
            .concat(recipesApi.middleware) //рецепты
            .concat(recipeIdApi.middleware) //рецепт{id}
            .concat(recipeCategorApi.middleware), //рецепт{id}
    devTools: !isProduction,
});
