import { Route, Routes } from 'react-router';

import { CategorPage } from '~/app/pages/categorPage';
import { HomePage } from '~/app/pages/home';
import { NotFoundPage } from '~/app/pages/notFountPage';
import { PopularPage } from '~/app/pages/popularPage';
import { RecipePage } from '~/app/pages/recipePage';
import { PATH_NOT_FOUND, PATH_THE_JUICIEST } from '~/constants/path';

export const RoutesApp = () => (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path={PATH_THE_JUICIEST} element={<PopularPage />} />

        <Route path='/:category/:subcategor' element={<CategorPage />} />
        <Route path='/:category/:subcategor/:idRecipe' element={<RecipePage />} />
        <Route path={`${PATH_THE_JUICIEST}/:idRecipe`} element={<RecipePage />} />

        <Route path={PATH_NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
);
