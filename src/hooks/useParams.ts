import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { GlobalCategorSearchType } from '~/types/searchType';

export const useParamsGlobal = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [searchState, setSearchState] = useState(false);
    const [stateFullClear, setFullClear] = useState(false);

    const [title, setRecipeSearch] = useState(searchParam.get('title') || '');
    const [allergens, setAllergenSearch] = useState(searchParam.get('allergens') || '');
    const [categors, setCategorSearch] = useState(searchParam.get('categors') || '');
    const [authorsId, setAuthorSearch] = useState(searchParam.get('authorsId') || '');
    const [meat, setMearSearch] = useState(searchParam.get('meat') || '');
    const [garnish, setGarnishSearch] = useState(searchParam.get('garnish') || '');

    useEffect(() => {
        setRecipeSearch(searchParam.get('title') || '');
        setAllergenSearch(searchParam.get('allergens') || '');
        setCategorSearch(searchParam.get('categors') || '');
        setAuthorSearch(searchParam.get('authorsId') || '');
        setMearSearch(searchParam.get('meat') || '');
        setGarnishSearch(searchParam.get('garnish') || '');
    }, [searchParam]);

    const params = useMemo(() => {
        const newParams = new Map<string, string>();

        if (title.length) {
            newParams.set('title', title);
        }

        if (allergens.length) {
            newParams.set('allergens', allergens);
        }

        if (categors.length) {
            newParams.set('categors', categors);
        }

        if (authorsId.length) {
            newParams.set('authorsId', authorsId);
        }

        if (meat.length) {
            newParams.set('meat', meat);
        }

        if (garnish.length) {
            newParams.set('garnish', garnish);
        }

        return newParams;
    }, [title, allergens, categors, authorsId, meat, garnish]);

    useEffect(() => {
        const newParams = Object.fromEntries(params);
        const newSearchParams = new URLSearchParams(newParams).toString();

        if (newSearchParams !== searchParam.toString()) {
            setSearchParam(new URLSearchParams(newParams));
        }
        //eslint-disable-next-line
    }, [params]);

    const setParams = useCallback(
        (text: string, searchType: GlobalCategorSearchType) => {
            switch (searchType) {
                case 'title':
                    if (text != title) {
                        setRecipeSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.title = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
                case 'allergens':
                    if (text != allergens) {
                        setAllergenSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.allergens = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
                case 'categors':
                    if (text != categors) {
                        setCategorSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.categors = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
                case 'authors':
                    if (text != authorsId) {
                        setAuthorSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.authorsId = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
                case 'meat':
                    if (text != meat) {
                        setMearSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.meat = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
                case 'garnish':
                    if (text != garnish) {
                        setGarnishSearch(text);
                        const newParams = Object.fromEntries(params);
                        newParams.garnish = text;
                        setSearchParam(new URLSearchParams(newParams));
                    }
                    break;
            }
        },
        [allergens, authorsId, categors, garnish, meat, params, setSearchParam, title],
    );

    useEffect(() => {
        setSearchState(searchParam.toString() !== '');
    }, [searchParam]);

    const clearParams = useCallback(() => {
        setRecipeSearch('');
        setAllergenSearch('');
        setCategorSearch('');
        setAuthorSearch('');
        setMearSearch('');
        setGarnishSearch('');
        setSearchParam({});

        setFullClear(true);

        setTimeout(() => setFullClear(false), 100);
    }, [setSearchParam]);

    return {
        searchState,
        setSearchState, //Состояние поиса
        searchParam,
        setParams,
        clearParams,
        title,
        allergens,
        categors,
        authorsId,
        meat,
        garnish,
        stateFullClear, //Дополнительная проверка для полной очистки
    };
};
