import { Box, Button, Center, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';

import { recipe } from '~/API/recipeApi';

import { RecipeCard } from '../recipeCard/recipeCard';

export type filterList = 'popular' | 'categor';

interface IRecipeList {
    list: recipe[];
    count: number;
    filter: filterList;
    isLoading: boolean;
    page: number;
    totalPage: number;
    onClickAddPageRecipes(): void;
    searchState?: boolean;
}

export const RecipeList: FC<IRecipeList> = ({
    list,
    count,
    filter,
    isLoading,
    page,
    totalPage,
    onClickAddPageRecipes,
    searchState,
}) =>
    list && list.length > 0 ? (
        <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
            <UnorderedList m='0' styleType='none'>
                <Flex
                    wrap='wrap'
                    gap={{ base: '14px', md: '14px', '2xl': '23px' }}
                    rowGap={
                        count > 4
                            ? { base: '14px', md: '14px', '2xl': '14px' }
                            : { base: '10px', md: '14px', '2xl': '22px' }
                    }
                >
                    {list.map((recipe, index) => (
                        <ListItem
                            data-test-id={`food-card-${index}`}
                            overflow='hidden'
                            flexBasis={{
                                base: '100%',
                                md: 'calc(50% - 8px)',
                                lg: '100%',
                                '2xl': 'calc(50% - 12px)',
                            }}
                            _hover={{
                                boxShadow:
                                    '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                            }}
                            key={index}
                        >
                            <RecipeCard
                                recipe={recipe}
                                urlConfig={filter === 'popular' ? 'popular' : 'categor'}
                                index={index}
                                key={index}
                            />
                        </ListItem>
                    ))}
                </Flex>
            </UnorderedList>

            <Center mt='8px'>
                {(location.pathname != '/' || searchState) && page != totalPage && (
                    <Button
                        data-test-id='load-more-button'
                        fontWeight='600'
                        fontSize='16px'
                        lineHeight='24px'
                        mt='4px'
                        color='black'
                        bg='rgba(177, 255, 46, 1)'
                        size='md'
                        colorScheme='teal'
                        variant='solid'
                        onClick={onClickAddPageRecipes}
                        // disabled={isLoading}
                    >
                        {isLoading ? 'Загрузка' : 'Загрузить ещё'}
                    </Button>
                )}
            </Center>
        </Box>
    ) : (
        <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>{/* {isLoading && <Loader />} */}</Box>
    );
