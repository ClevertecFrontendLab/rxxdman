import { FC } from 'react';

import { Category } from '~/api/types/category';
import { SearchType } from '~/types/searchType';
import { UserList } from '~/types/user';

import { FilterDrawerTag } from './filterDrawerTag';

type RenderFilterTagsProps = {
    searchList: string[];
    fullList: Category[] | SearchType[] | UserList;
    setRemove: React.Dispatch<React.SetStateAction<string[]>>;
    getTitle(item: string, FullList: Category[] | SearchType[] | UserList): string;
};

export const RenderFilterTags: FC<RenderFilterTagsProps> = ({
    searchList,
    setRemove,
    getTitle,
    fullList,
}) =>
    searchList.length &&
    searchList
        .filter(Boolean)
        .map((item) => (
            <FilterDrawerTag
                key={item}
                title={getTitle(item, fullList)}
                setRemove={setRemove}
                removeTitle={item}
            />
        ));
