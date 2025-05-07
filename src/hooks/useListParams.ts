import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { useGetRecipeFromCategorQuery, useGetRecipesQuery } from '~/api/query/recipeQuery';
import { Category } from '~/api/types/category';
import { Recipe } from '~/api/types/recipe';
import { FilterList } from '~/types/filterList';

import { useParamsGlobal } from './useParams';

export const useListParams = (count: number, filter: FilterList) => {
    const { data: categories, isLoading: categorIsLoading } = useGetCategoriesQuery();

    const location = useLocation();
    const [pathname, setPathname] = useState<string[]>([]);

    useEffect(() => {
        setPathname(location.pathname.split('/').filter(Boolean));
    }, [location.pathname]);

    const { searchParam } = useParamsGlobal();
    const [recipeSearch, setRecipeSearch] = useState(searchParam.get('title') || '');
    const [allergenSearch, setAllergenSearch] = useState(searchParam.get('allergens') || '');
    const [categorsSearch, setCategorsSearch] = useState(searchParam.get('categors') || '');
    const [authorSearch, setAuthorSearch] = useState(searchParam.get('authorsId') || '');
    const [meatSearch, setMeatSearch] = useState(searchParam.get('meat') || '');
    const [garnishSearch, setGarnishSearch] = useState(searchParam.get('garnish') || '');

    useEffect(() => {
        setRecipeSearch(searchParam.get('title') || '');
        setAllergenSearch(searchParam.get('allergens') || '');
        setCategorsSearch(searchParam.get('categors') || '');
        setAuthorSearch(searchParam.get('authorsId') || '');
        setMeatSearch(searchParam.get('meat') || '');
        setGarnishSearch(searchParam.get('garnish') || '');
    }, [searchParam]);

    const [visibleList, setVisibleList] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1);
    const [localParams, setLocalParams] = useState(searchParam);

    const params = () => {
        const newParams = new Map<string, string | number>();

        newParams.set('page', page);
        newParams.set('limit', count);
        newParams.set('sortBy', 'likes');
        newParams.set('sortOrder', 'desc');

        if (recipeSearch.length) {
            newParams.set('searchString', recipeSearch);
        }

        if (allergenSearch.length) {
            newParams.set('allergens', allergenSearch);
        }

        const categor = categories?.find(
            (categor) => categor.subCategories && categor.category === pathname[0],
        );

        const findCategor = categorsSearch.split(',');

        const categorsSearchParam = categories
            ?.flatMap((categor) => {
                if (findCategor.includes(categor.category) && categor.subCategories) {
                    return categor.subCategories.map((subCat) => subCat._id);
                }
                return [];
            })
            .join(',');

        if ((categor as Category) || categorsSearch.length) {
            newParams.set(
                'subcategoriesIds',
                categor?.subCategories?.map((subCategor) => subCategor._id).join(',') ||
                    categorsSearchParam ||
                    '',
            );
        }

        if (authorSearch.length) {
            newParams.set('authorsId', authorSearch);
        }

        if (meatSearch.length) {
            newParams.set('meat', meatSearch);
        }

        if (garnishSearch.length) {
            newParams.set('garnish', garnishSearch);
        }

        return Object.fromEntries(newParams);
    };

    const {
        data: dataRecipeListPopular,
        isSuccess: popularIsSucces,
        isError: popularIsError,
        status: statusPopular,
        refetch: refetchSearch,
    } = useGetRecipesQuery(params(), {
        skip: (filter != 'popular' && searchParam.toString().length < 1) || categorIsLoading,
    });

    const {
        data: dataRecipeListCategor,
        isSuccess: categorIsSucces,
        isError: categorIsError,
        status: statusCategor,
    } = useGetRecipeFromCategorQuery(
        {
            idCategor: categories?.find((categor) => categor.category === pathname[1])?._id || '',
            params: {
                limit: count,
                page: page,
            },
        },
        {
            skip: filter != 'categor' || pathname[1] === undefined || categorIsLoading,
        },
    );

    useEffect(() => {
        setVisibleList([]);
    }, []);

    useEffect(() => {
        if (filter === 'popular' && localParams != searchParam && dataRecipeListPopular) {
            setVisibleList([]);
            setPage(1);
            setLocalParams(searchParam);
        }
    }, [dataRecipeListPopular, filter, localParams, searchParam]);

    useEffect(() => {
        if (pathname !== location.pathname.split('/').filter(Boolean) && filter === 'categor') {
            setVisibleList([]);
            setPage(1);
        }
    }, [filter, location.pathname, pathname]);

    useEffect(() => {
        if (filter === 'popular' && popularIsSucces && dataRecipeListPopular.data)
            setVisibleList((prevList) => [
                ...prevList,
                ...(dataRecipeListPopular.data as Recipe[]),
            ]);
    }, [dataRecipeListPopular?.data, filter, popularIsSucces]);

    useEffect(() => {
        if (filter === 'categor' && categorIsSucces && dataRecipeListCategor.data)
            setVisibleList((prevList) => [
                ...prevList,
                ...(dataRecipeListCategor.data as Recipe[]),
            ]);
    }, [categorIsSucces, dataRecipeListCategor?.data, filter]);

    const onClickAddRecipes = () => {
        setPage(page + 1);
    };

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [totalPage, setIsTotalPage] = useState(10);

    useEffect(() => {
        if (filter === 'popular') {
            setIsError(popularIsError);
            setIsTotalPage(dataRecipeListPopular?.meta.totalPages || 0);
        } else {
            setIsError(categorIsError);
            setIsTotalPage(dataRecipeListCategor?.meta.totalPages || 0);
        }
    }, [
        categorIsError,
        dataRecipeListCategor?.meta.totalPages,
        dataRecipeListPopular?.meta.totalPages,
        filter,
        popularIsError,
    ]);

    useEffect(() => {
        if (filter === 'popular') {
            setIsLoading(statusPopular === 'pending' ? true : false);
            setIsSuccess(popularIsSucces);
        } else {
            setIsLoading(statusCategor === 'pending' ? true : false);
            setIsSuccess(categorIsSucces);
        }
    }, [categorIsSucces, filter, popularIsSucces, statusCategor, statusPopular]);

    return {
        visibleList,
        isError,
        isLoading,
        isSuccess,
        onClickAddRecipes,
        refetchSearch,
        page,
        totalPage,
    };
};
