import { Category } from '~/api/types/category';

export const buildBreadcrumbPaths = (index: number, categor: Category, pathnames: string[]) => {
    const path = `/${[...pathnames]
        .slice(0, index + 1)
        .map((path) =>
            categor && categor.subCategories
                ? `${categor.category}/${categor.subCategories[0].category}`
                : path,
        )
        .join('/')}`;

    return path;
};
