import React from 'react';
import { useEffect, useRef, useState } from 'react';

import { GlobalCategorSearchType } from '~/types/searchType';

type PropsUseAllergenSelect = {
    allergensSearch: string;
    setIsAllergen?: React.Dispatch<React.SetStateAction<boolean>>;
    allergenSynchronData?: string[];
    setDrawerData?: React.Dispatch<React.SetStateAction<string[]>>;
    isOpen?: boolean;
    stateFullClear: boolean;
    setSelectedAllergensLocal?: React.Dispatch<React.SetStateAction<string[]>>;
    setParams(text: string, searchType: GlobalCategorSearchType): void;
};

export const useAllergenSelect = ({
    allergensSearch,
    setIsAllergen,
    allergenSynchronData,
    setDrawerData,
    isOpen,
    stateFullClear,
    setSelectedAllergensLocal,
    setParams,
}: PropsUseAllergenSelect) => {
    const [indexAcc, setIndex] = useState(-1);
    const ref = useRef<HTMLDivElement | null>(null);

    const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
        allergensSearch
            .split(',')
            .map((allergen) => allergen.trim())
            .filter(Boolean) || [],
    );
    const [isChecked, setIschecked] = useState(true);
    const [otherAllergen, setOtherAllergen] = useState('');

    useEffect(() => {
        setIschecked(allergensSearch.length ? true : false);
    }, [allergensSearch.length]);

    useEffect(() => {
        if (setIsAllergen)
            if (selectedAllergens.length) setIsAllergen(true);
            else setIsAllergen(false);
    }, [selectedAllergens.length, setIsAllergen]);

    useEffect(() => {
        if (allergenSynchronData) {
            setSelectedAllergens(allergenSynchronData);
        }
    }, [allergenSynchronData]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIndex(-1);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    useEffect(() => {
        setDrawerData && setDrawerData(selectedAllergens);
    }, [selectedAllergens, setDrawerData]);

    const toggleCheckbox = (allergen: string) => {
        setSelectedAllergens((prev) => {
            const newSelected = prev.includes(allergen)
                ? prev.filter((item) => item !== allergen)
                : [...prev, allergen];
            return newSelected;
        });

        setDrawerData &&
            setDrawerData((prev) => {
                const newSelected = prev.includes(allergen)
                    ? prev.filter((item) => item !== allergen)
                    : [...prev, allergen];
                return newSelected;
            });
    };

    const addOtherAllergen = () => {
        const trimmed = otherAllergen.trim();
        if (trimmed && !selectedAllergens.includes(trimmed)) {
            setSelectedAllergens((prev) => {
                const newSelected = [...prev, trimmed];
                return newSelected;
            });

            setDrawerData &&
                setDrawerData((prev) => {
                    const newSelected = [...prev, trimmed];
                    return newSelected;
                });

            setOtherAllergen('');
        }
    };

    const removeAllergen = (allergen: string) => {
        setSelectedAllergens((prev) => {
            const newSelected = prev.filter((item) => item !== allergen);
            return newSelected;
        });
    };

    const onChange = (): void => {
        setIschecked(!isChecked);

        if (!isOpen && allergensSearch.length) {
            setSelectedAllergens(selectedAllergens);
        }
    };

    useEffect(() => {
        if (stateFullClear) {
            setSelectedAllergens([]);
            setIschecked(false);
        }
    }, [stateFullClear]);

    useEffect(() => {
        setIsAllergen?.(selectedAllergens.length > 0);
    }, [allergensSearch.length, selectedAllergens.length, setIsAllergen]);

    useEffect(() => {
        if (!isChecked) setSelectedAllergens([]);
    }, [isChecked]);

    useEffect(() => {
        if (setSelectedAllergensLocal) {
            if (selectedAllergens.length) {
                setSelectedAllergensLocal(selectedAllergens);
            } else {
                setSelectedAllergensLocal([]);
                setParams('', 'allergens');
            }
        }
    }, [isOpen, selectedAllergens, setParams, setSelectedAllergensLocal]);

    return {
        ref,
        indexAcc,
        isChecked,
        selectedAllergens,
        otherAllergen,
        addOtherAllergen,
        toggleCheckbox,
        onChange,
        removeAllergen,
        setIndex,
        setOtherAllergen,
    };
};
