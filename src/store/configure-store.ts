import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/api/query/authQuery';
import { categoryApi } from '~/api/query/categorsQuery';
import { recipesApi } from '~/api/query/recipeQuery';
import { apiSlice } from '~/query/create-api';

import appReducer, { appSlice } from './app-slice';
import recipeReducer from './slice/recipe-slice';
const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    recipe: recipeReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(authApi.middleware)
            .concat(categoryApi.middleware)
            .concat(recipesApi.middleware),
    devTools: !isProduction,
});

export type RootState = ReturnType<typeof store.getState>;
