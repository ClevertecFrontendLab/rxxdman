import { Route, Routes } from 'react-router';

import { CategorPage } from '~/app/pages/categorPage';
import { HomePage } from '~/app/pages/home';
import { NotFoundPage } from '~/app/pages/notFountPage';
import { PopularPage } from '~/app/pages/popularPage';
import { RecipePage } from '~/app/pages/recipePage';
import { PATHS } from '~/constants/path';

import { NewRecipePage } from '../pages/newRecipePage';

export const RoutesApp = () => (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={PATHS.THE_JUICIEST} element={<PopularPage />} />

        <Route path='/:category/:subcategor' element={<CategorPage />} />
        <Route path='/:category/:subcategor/:idRecipe' element={<RecipePage />} />
        <Route path={`${PATHS.THE_JUICIEST}/:idRecipe`} element={<RecipePage />} />

        <Route path={`${PATHS.NEW_RECIPE}`} element={<NewRecipePage />} />
        <Route
            path={`${PATHS.NEW_RECIPE}/:category/:subcategor/:idRecipe`}
            element={<NewRecipePage />}
        />

        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
);
