import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { category, useGetCategoriesQuery } from '~/API/categorsApi';
import { recipe, useGetRecipeCategorQuery, useGetRecipesQuery } from '~/API/recipeApi';
import { useParamsGlobal } from '~/data/useParams';

import { filterList } from '../components/recipeList/recipeList';

export const useListParams = (count: number, filter: filterList) => {
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

    const [visibleList, setVisibleList] = useState<recipe[]>([]);
    const [page, setPage] = useState(1);
    const [localParams, setLocalParams] = useState(searchParam);

    const params = () => {
        const newParams = new Map<string, string | number>();

        newParams.set('page', page);
        newParams.set('limit', count);
        newParams.set('sortBy', 'likes');
        newParams.set('sortOrder', 'desc');

        //Ввод текста
        if (recipeSearch.length > 0) {
            newParams.set('searchString', recipeSearch);
        }

        //Выбор аллергенов
        if (allergenSearch.length > 0) {
            newParams.set('allergens', allergenSearch);
        }

        const categor = categories?.find(
            (categor) => categor.subCategories && categor.category === pathname[0],
        );

        const findCategor = categorsSearch.split(','); //ID категорий, которые ищем

        const categorsSearchParam = categories
            ?.flatMap((categor) => {
                // Проверяем, входит ли ID текущей категории в массив искомых категорий
                if (findCategor.includes(categor.category) && categor.subCategories) {
                    // Если да, возвращаем массив ID всех подкатегорий данной категории
                    return categor.subCategories.map((subCat) => subCat._id);
                }
                // Если нет, возвращаем пустой массив
                return [];
            })
            .join(','); // Объединяем все ID в строку через запятую

        //Выбор категорий
        if ((categor as category) || categorsSearch.length > 0) {
            newParams.set(
                'subcategoriesIds',
                categor?.subCategories?.map((subCategor) => subCategor._id).join(',') ||
                    categorsSearchParam ||
                    '',
            );
        }

        //Выбор авторов
        if (authorSearch.length > 0) {
            newParams.set('authorsId', authorSearch);
        }

        //Выбор мяса
        if (meatSearch.length > 0) {
            newParams.set('meat', meatSearch);
        }

        //Выбор гарнира
        if (garnishSearch.length > 0) {
            newParams.set('garnish', garnishSearch);
        }

        return Object.fromEntries(newParams);
    };

    //Пупулярный + поиск
    const {
        data: dataRecipeListPopular,
        isSuccess: popularIsSucces,
        isError: popularIsError,
        status: statusPopular,
        refetch: refetchSearch,
    } = useGetRecipesQuery(params(), {
        skip: filter != 'popular' && searchParam.toString().length === 0,
    });

    //Категории
    const {
        data: dataRecipeListCategor,
        isSuccess: categorIsSucces,
        isError: categorIsError,
        status: statusCategor,
    } = useGetRecipeCategorQuery(
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

    //Стартовая очистка
    useEffect(() => {
        setVisibleList([]);
    }, []);

    useEffect(() => {
        //При изменении параметров
        if (filter === 'popular' && localParams != searchParam && dataRecipeListPopular) {
            setVisibleList([]);
            setPage(1);
            setLocalParams(searchParam);
        }
    }, [dataRecipeListPopular, filter, localParams, searchParam]);

    //При изменении пути обнуляем список
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
                ...(dataRecipeListPopular.data as recipe[]),
            ]);
    }, [dataRecipeListPopular?.data, filter, popularIsSucces]);

    useEffect(() => {
        if (filter === 'categor' && categorIsSucces && dataRecipeListCategor.data)
            setVisibleList((prevList) => [
                ...prevList,
                ...(dataRecipeListCategor.data as recipe[]),
            ]);
    }, [categorIsSucces, dataRecipeListCategor?.data, filter]);

    const onClickAddRecipes = () => {
        setPage(page + 1);
    };

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [totalPage, setIsTotalPage] = useState(0);

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
