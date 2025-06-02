import { useCallback, useEffect, useRef, useState } from 'react';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { SubCategories, SubCategory } from '~/api/types/category';

export const useSelectTags = (
    selectedTags: SubCategories,
    setSelectedTags: React.Dispatch<React.SetStateAction<SubCategories>>,
) => {
    const { data: categories, error, status, isSuccess } = useGetCategoriesQuery();

    const [tagsList, setTagsList] = useState([] as SubCategories);

    useEffect(() => {
        if (categories && !error && status != 'pending' && isSuccess) {
            const subtegories = [...categories].filter((category) => category.rootCategoryId);
            setTagsList(subtegories as SubCategories);
        }
    }, [categories, error, isSuccess, status]);

    const toggleCheckbox = (tag: SubCategory) => {
        setSelectedTags((prev) => {
            const newSelected = prev.includes(tag)
                ? prev.filter((item) => item !== tag)
                : [...prev, tag];
            return newSelected;
        });
    };

    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(selectedTags.length);
    const prevVisibleCountRef = useRef(visibleCount);

    const updateVisibleCount = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        let totalWidth = 0;
        let count = 0;

        for (let i = 0; i < selectedTags.length; i++) {
            const tagElement = container.children[i] as HTMLSpanElement;
            if (tagElement) {
                const tagWidth = tagElement.offsetWidth;

                if (totalWidth + tagWidth + 80 > containerWidth) {
                    break;
                }
                totalWidth += tagWidth;
                count++;
            }
        }

        if (count !== prevVisibleCountRef.current) {
            prevVisibleCountRef.current = count;
            setVisibleCount(count);
        }
    }, [selectedTags]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(updateVisibleCount);
        resizeObserver.observe(container);

        updateVisibleCount();

        return () => resizeObserver.disconnect();
    }, [updateVisibleCount]);

    const visibleTags = selectedTags.slice(0, visibleCount);
    const hiddenTagsCount = selectedTags.length - visibleCount;

    return { tagsList, toggleCheckbox, visibleTags, hiddenTagsCount, containerRef };
};
