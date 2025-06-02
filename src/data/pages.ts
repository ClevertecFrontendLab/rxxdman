import { PATHS } from '~/constants/path';
import { Page } from '~/types/pages';

export const pagesApp: Page[] = [
    {
        title: 'Главная',
        path: '/',
    },
    {
        title: 'Самое сочное',
        path: PATHS.THE_JUICIEST,
    },
    {
        title: 'Новый рецепт',
        path: PATHS.NEW_RECIPE,
    },
];
