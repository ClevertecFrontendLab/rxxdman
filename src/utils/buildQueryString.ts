import { GetRecipesAllParams } from '~/api/types/responce';

export const buildQueryString = (params: GetRecipesAllParams): string => {
    const stringifiedParams = Object.entries(params)
        .filter(([_, v]) => v !== undefined)
        .map(([key, value]) => [key, String(value)]);
    const queryString = new URLSearchParams(stringifiedParams).toString();
    return queryString;
};
