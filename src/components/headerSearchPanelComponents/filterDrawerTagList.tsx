import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { Categories, Category } from '~/api/types/category';
import { garnishList } from '~/data/filterGarnish';
import { meatsList } from '~/data/filterMeats';
import { users } from '~/mock/usersMock';
import { SearchType } from '~/types/searchType';
import { UserList } from '~/types/user';

import { RenderFilterTags } from './RenderFilterTags';

type FilterDrawerTagList = {
    selectedCategor: string[];
    selectedAuthor: string[];
    selectedMeat: string[];
    selectedGarnish: string[];
    setSelectedCategor: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedMeat: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedGarnish: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterDrawerTagList: FC<FilterDrawerTagList> = ({
    selectedCategor,
    selectedAuthor,
    selectedMeat,
    selectedGarnish,
    setSelectedCategor,
    setSelectedAuthor,
    setSelectedMeat,
    setSelectedGarnish,
}) => {
    const { data: categories } = useGetCategoriesQuery();
    const categorsArray = [...(categories as Categories)].filter(
        (categor) => categor.subCategories,
    );

    return (
        <Flex gap='16px' flexWrap='wrap-reverse' mt='auto'>
            {selectedCategor.length > 0 && (
                <RenderFilterTags
                    searchList={selectedCategor}
                    fullList={categorsArray}
                    setRemove={setSelectedCategor}
                    getTitle={(categor, fullList: Category[]) =>
                        fullList.find((item) => item.category === categor)?.title || ''
                    }
                />
            )}

            {selectedAuthor.length > 0 && (
                <RenderFilterTags
                    searchList={selectedAuthor}
                    fullList={users}
                    setRemove={setSelectedAuthor}
                    getTitle={(author, fullList: UserList) =>
                        fullList.find((user) => user.id === author)?.name +
                            ' ' +
                            fullList.find((user) => user.id === author)?.surname || ''
                    }
                />
            )}

            {selectedMeat.length > 0 && (
                <RenderFilterTags
                    searchList={selectedMeat}
                    fullList={meatsList}
                    setRemove={setSelectedMeat}
                    getTitle={(meat, fullList: SearchType[]) =>
                        fullList.find((item) => item.title === meat)?.title || ''
                    }
                />
            )}

            {selectedGarnish.length > 0 && (
                <RenderFilterTags
                    searchList={selectedGarnish}
                    fullList={garnishList}
                    setRemove={setSelectedGarnish}
                    getTitle={(garnish, fullList: SearchType[]) =>
                        fullList.find((item) => item.title === garnish)?.title || ''
                    }
                />
            )}
        </Flex>
    );
};
