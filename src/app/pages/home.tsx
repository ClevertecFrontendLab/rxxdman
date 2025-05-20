import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Heading, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import {
    RECIPES_DEFAULT_LIMIT,
    RECIPES_HOME_PAGE_LIMIT,
    RECIPES_SLIDER_LIMIT,
} from '~/api/constants/apiConstant';
import { useGetRecipesQuery } from '~/api/query/recipeQuery';
import { BlogList } from '~/components/blogsList/blogList';
import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { SliderRecipe } from '~/components/sliderRecipe/sliderRecipe';
import { BUTTON_TITLE_ALL_AUTHORS, BUTTON_TITLE_ALL_SELECTION } from '~/constants/button';
import { PATHS } from '~/constants/path';
import { DEFAULT_TITLE_SEARCH_PANEL } from '~/constants/searchPanel';
import {
    CULINARY_BLOGS_TITLE,
    NEW_RECIPES_TITLE,
    THE_JUICIUS_TITLE,
} from '~/constants/titleBlocks';
import { useListParams } from '~/hooks/useListParams';
import { useParamsGlobal } from '~/hooks/useParams';

export const HomePage = () => {
    const navigate = useNavigate();

    const {
        searchState,
        setParams,
        clearParams,
        title,
        allergens,
        categors,
        authorsId,
        meat,
        garnish,
        stateFullClear,
    } = useParamsGlobal();

    const { visibleList, isLoading, page, totalPage, onClickAddRecipes, isSuccess } = useListParams(
        searchState ? RECIPES_DEFAULT_LIMIT : RECIPES_HOME_PAGE_LIMIT,
        'popular',
    );

    const {
        data: sliderList,
        error: errorSlider,
        isSuccess: isSuccesSlider,
    } = useGetRecipesQuery({
        limit: RECIPES_SLIDER_LIMIT,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    return (
        <Flex direction='column' h='100%'>
            <Box mb={{ base: '31px', lg: '20px' }}>
                <HeaderPages
                    title={DEFAULT_TITLE_SEARCH_PANEL}
                    searchState={searchState}
                    textSearch={title}
                    allergensSearch={allergens}
                    categorsSearch={categors}
                    authorsSearch={authorsId}
                    meatSearch={meat}
                    garnishSearch={garnish}
                    setParams={setParams}
                    clearParams={clearParams}
                    stateFullClear={stateFullClear}
                    isLoading={isLoading}
                    totalPage={totalPage}
                />
            </Box>

            {!searchState ? (
                <Flex direction='column'>
                    {isSuccesSlider && (
                        <Box mb={{ base: '28px', lg: '33px' }}>
                            <SliderRecipe
                                title={NEW_RECIPES_TITLE}
                                key='sliderHomePage'
                                sliderList={sliderList}
                                error={errorSlider}
                            />
                        </Box>
                    )}

                    {isSuccess && (
                        <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
                            <HStack
                                display='flex'
                                justify='space-between'
                                align='center'
                                mb={{ base: '11px', lg: '14px', '2xl': '24px' }}
                            >
                                <Heading
                                    as='h2'
                                    textAlign='left'
                                    fontWeight='500'
                                    fontSize={{ base: '24px', lg: '36px', '2xl': '48px' }}
                                    lineHeight={{ base: '32px', lg: '40px', '2xl': '48px' }}
                                    letterSpacing='1.6px'
                                >
                                    {THE_JUICIUS_TITLE}
                                </Heading>

                                <Button
                                    data-test-id='juiciest-link'
                                    onClick={() => {
                                        navigate(PATHS.THE_JUICIEST);
                                    }}
                                    display={{ base: 'none', lg: 'flex' }}
                                    alignItems='center'
                                    fontWeight='600'
                                    fontSize='18px'
                                    lineHeight='28px'
                                    mt='4px'
                                    color='black'
                                    bg='rgba(177, 255, 46, 1)'
                                    size={{ lg: 'md', '2xl': 'lg' }}
                                    rightIcon={<ArrowForwardIcon h='16px' w='16px' />}
                                    colorScheme='green'
                                    variant='solid'
                                >
                                    {BUTTON_TITLE_ALL_SELECTION}
                                </Button>
                            </HStack>

                            <RecipeList
                                filter='popular'
                                count={RECIPES_HOME_PAGE_LIMIT}
                                list={visibleList}
                                isLoading={isLoading}
                                page={page}
                                totalPage={totalPage}
                                onClickAddPageRecipes={onClickAddRecipes}
                            />

                            <Center mt='7px' display={{ base: 'block', lg: 'none' }}>
                                <Button
                                    data-test-id='juiciest-link-mobile'
                                    onClick={() => {
                                        navigate(PATHS.THE_JUICIEST);
                                    }}
                                    fontWeight='600'
                                    fontSize='16px'
                                    lineHeight='24px'
                                    mt='4px'
                                    color='black'
                                    bg='rgba(177, 255, 46, 1)'
                                    size='md'
                                    rightIcon={<ArrowForwardIcon />}
                                    colorScheme='teal'
                                    variant='solid'
                                >
                                    {BUTTON_TITLE_ALL_SELECTION}
                                </Button>
                            </Center>
                        </Box>
                    )}

                    <Box
                        mb={{ base: '31px', lg: '40px' }}
                        bg='rgba(196, 255, 97, 1)'
                        borderRadius='16px'
                        p={{
                            base: '12px',
                            lg: '19px 24px 26px 25px',
                            '2xl': '20px 24px 26px 25px',
                        }}
                    >
                        <HStack
                            display='flex'
                            justify='space-between'
                            align='center'
                            mb={{ base: '12px', lg: '18px', '2xl': '24px' }}
                        >
                            <Heading
                                as='h2'
                                textAlign='left'
                                fontWeight='400'
                                fontSize={{ base: '24px', lg: '30px', '2xl': '36px' }}
                                lineHeight={{ base: '32px', lg: '36px', '2xl': '40px' }}
                                letterSpacing='1px'
                            >
                                {CULINARY_BLOGS_TITLE}
                            </Heading>

                            <Button
                                display={{ base: 'none', lg: 'block' }}
                                fontWeight='600'
                                fontSize='18px'
                                lineHeight='28px'
                                mt='4px'
                                p='10px 20px 10px 24px'
                                color='black'
                                size={{ lg: 'md', '2xl': 'lg' }}
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme='teal'
                                variant='ghost'
                            >
                                {BUTTON_TITLE_ALL_AUTHORS}
                            </Button>
                        </HStack>

                        <BlogList />

                        <Center mt='12px' display={{ base: 'block', lg: 'none' }}>
                            <Button
                                fontWeight='600'
                                fontSize='16px'
                                lineHeight='24px'
                                color='black'
                                size='md'
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme='teal'
                                variant='ghost'
                            >
                                {BUTTON_TITLE_ALL_AUTHORS}
                            </Button>
                        </Center>
                    </Box>

                    <Box>
                        <RelevantKitchen />
                    </Box>
                </Flex>
            ) : (
                <Flex direction='column' h='100%' justify='space-between'>
                    <RecipeList
                        count={RECIPES_DEFAULT_LIMIT}
                        filter='popular'
                        list={visibleList}
                        isLoading={isLoading}
                        page={page}
                        totalPage={totalPage}
                        onClickAddPageRecipes={onClickAddRecipes}
                        searchState={true}
                    />

                    <Box>
                        <RelevantKitchen />
                    </Box>
                </Flex>
            )}
        </Flex>
    );
};
