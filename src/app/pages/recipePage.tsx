import { Box, Center, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { RECIPES_SLIDER_LIMIT } from '~/api/constants/apiConstant';
import { useGetRecipeByIdQuery, useGetRecipesQuery } from '~/api/query/recipeQuery';
import { AllertApp } from '~/components/alertApp/alertApp';
import { AuthorCard } from '~/components/recipePageComponents/authorCard';
import { IngredientTable } from '~/components/recipePageComponents/ingredientsTable';
import { NutritionValueList } from '~/components/recipePageComponents/nutritionValueList';
import { RecipePageHeader } from '~/components/recipePageComponents/recipePageHeader';
import { StepsList } from '~/components/recipePageComponents/stepsList';
import { SliderRecipe } from '~/components/sliderRecipe/sliderRecipe';
import { ERROR_DESCRIPTION, ERROR_TITLE } from '~/constants/errorAlert';
import { NEW_RECIPES_TITLE } from '~/constants/titleBlocks';
import { setRecipeId } from '~/store/slice/recipe-slice';

export const RecipePage = () => {
    const { idRecipe } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRecipeId(idRecipe));
    }, [idRecipe, dispatch]);

    const navigate = useNavigate();

    const { data: recipe, error, isLoading } = useGetRecipeByIdQuery(idRecipe || '');

    const { data: sliderList, error: errorSlider } = useGetRecipesQuery({
        limit: RECIPES_SLIDER_LIMIT,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    });

    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (error) {
            onOpen();
            navigate(-1);
        }
    }, [error, navigate, onOpen]);

    return (
        <Box>
            {isOpen && (
                <AllertApp title={ERROR_TITLE} message={ERROR_DESCRIPTION} onClose={onClose} />
            )}
            {recipe && (
                <Flex
                    direction='column'
                    gap={{ base: '24px', lg: '40px' }}
                    pt={{ base: '16px', lg: '56px' }}
                    pb={{ base: '32px' }}
                    mb='12px'
                >
                    <Box>
                        <RecipePageHeader recipe={recipe} />
                    </Box>

                    <Center>
                        <Box w={{ base: '100%', lg: '578px', '2xl': '668px' }}>
                            <NutritionValueList nutritionValue={recipe.nutritionValue} />
                        </Box>
                    </Center>

                    <Center>
                        <Box w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}>
                            <IngredientTable
                                portions={recipe.portions}
                                ingredients={recipe.ingredients}
                            />
                        </Box>
                    </Center>

                    <Center>
                        <Box w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}>
                            <StepsList steps={recipe.steps} />
                        </Box>
                    </Center>

                    <Center>
                        <Box w={{ base: '100%', md: '604px', lg: '578px', '2xl': '668px' }}>
                            <AuthorCard author={recipe.authorData} />
                        </Box>
                    </Center>
                </Flex>
            )}

            {!isLoading && (
                <Box>
                    <SliderRecipe
                        title={NEW_RECIPES_TITLE}
                        key='sliderRecipePage'
                        error={errorSlider}
                        sliderList={sliderList}
                    />
                </Box>
            )}
        </Box>
    );
};
