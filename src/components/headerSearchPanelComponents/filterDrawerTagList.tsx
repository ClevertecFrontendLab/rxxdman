import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { categories, useGetCategoriesQuery } from '~/API/categorsApi';
import { garnishList, meatsList } from '~/data/drawerData';
import { users } from '~/data/user';

import { FilterDrawerTag } from './filterDrawerTag';

interface IFilterDrawerTagList {
    selectedCategor: string[];
    selectedAuthor: string[];
    selectedMeat: string[];
    selectedGarnish: string[];
    setSelectedCategor: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedMeat: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedGarnish: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterDrawerTagList: FC<IFilterDrawerTagList> = ({
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
    const categorsArray = [...(categories as categories)].filter(
        (categor) => categor.subCategories,
    );

    return (
        <Flex gap='16px' flexWrap='wrap-reverse' mt='auto'>
            {selectedCategor.length > 0 &&
                selectedCategor
                    .filter(Boolean)
                    .map((categor, index) => (
                        <FilterDrawerTag
                            key={index}
                            title={
                                categorsArray.find(
                                    (categorSearch) => categorSearch.category === categor,
                                )?.title || ''
                            }
                            setRemove={setSelectedCategor}
                            removeTitle={categor}
                        />
                    ))}

            {selectedAuthor.length > 0 &&
                selectedAuthor
                    .filter(Boolean)
                    .map((author, index) => (
                        <FilterDrawerTag
                            key={selectedCategor.length + index + 1}
                            title={
                                users.find((user) => user.id === author)?.name +
                                ' ' +
                                users.find((user) => user.id === author)?.surname
                            }
                            setRemove={setSelectedAuthor}
                            removeTitle={author}
                        />
                    ))}

            {selectedMeat.length > 0 &&
                selectedMeat
                    .filter(Boolean)
                    .map((meat, index) => (
                        <FilterDrawerTag
                            key={selectedCategor.length + selectedAuthor.length + index + 1}
                            title={
                                meatsList.find((meatSearch) => meatSearch.titleRu === meat)
                                    ?.titleRu || ''
                            }
                            setRemove={setSelectedMeat}
                            removeTitle={meat}
                        />
                    ))}

            {selectedGarnish.length > 0 &&
                selectedGarnish
                    .filter(Boolean)
                    .map((garnish, index) => (
                        <FilterDrawerTag
                            key={
                                selectedCategor.length +
                                selectedAuthor.length +
                                selectedMeat.length +
                                index +
                                1
                            }
                            title={
                                garnishList.find(
                                    (garnishSearch) => garnishSearch.titleRu === garnish,
                                )?.titleRu || ''
                            }
                            setRemove={setSelectedGarnish}
                            removeTitle={garnish}
                        />
                    ))}
        </Flex>
    );
};
