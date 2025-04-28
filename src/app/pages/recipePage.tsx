import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { AuthorCard } from '~/components/recipePageComponents/authorCard';
import { IngredientTable } from '~/components/recipePageComponents/ingredientsTable';
import { NutritionValueList } from '~/components/recipePageComponents/nutritionValueList';
import { RecipePageHeader } from '~/components/recipePageComponents/recipePageHeader';
import { StepsList } from '~/components/recipePageComponents/stepsList';
import { SliderRecipe } from '~/components/sliderRecipe/sliderRecipe';
import { recipeListMock } from '~/data/recipes';

export const RecipePage = () => {
    const { idRecipe } = useParams();

    const recipe = recipeListMock.find((recipe) => recipe.id === idRecipe);

    return (
        <Box>
            {recipe ? (
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
                            <AuthorCard idRecipe={recipe.id} />
                        </Box>
                    </Center>
                </Flex>
            ) : (
                <Flex direction='column' pt={{ base: '56px' }} pb={{ base: '32px' }} mb='12px'>
                    <Center>
                        <Text fontWeight='600' fontSize='64px'>
                            Рецепт отсутствует
                        </Text>
                    </Center>
                </Flex>
            )}

            <Box>
                <SliderRecipe title='Новые рецепты' key='sliderRecipePage' />
            </Box>
        </Box>
    );
};
