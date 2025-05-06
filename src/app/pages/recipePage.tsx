import { Box, Center, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipeIdQuery } from '~/API/recipeApi';
import { ErrorAllert } from '~/components/errorAlert/errorAllert';
import { AuthorCard } from '~/components/recipePageComponents/authorCard';
import { IngredientTable } from '~/components/recipePageComponents/ingredientsTable';
import { NutritionValueList } from '~/components/recipePageComponents/nutritionValueList';
import { RecipePageHeader } from '~/components/recipePageComponents/recipePageHeader';
import { StepsList } from '~/components/recipePageComponents/stepsList';
import { SliderRecipe } from '~/components/sliderRecipe/sliderRecipe';

export const RecipePage = () => {
    const { idRecipe } = useParams();
    const navigate = useNavigate();

    const { data: recipe, error, isLoading } = useGetRecipeIdQuery(idRecipe ? idRecipe : '');

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
                <ErrorAllert
                    title='Ошибка сервера'
                    message='Попробуйте поискать снова попозже'
                    onClose={onClose}
                />
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
                    <SliderRecipe title='Новые рецепты' key='sliderRecipePage' />
                </Box>
            )}
        </Box>
    );
};
