import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { PencilIco } from '~/assets/createSvg';
import { AddIngredientsTable } from '~/components/recipePageComponents/newRecipePage/addIngredientsTable';
import { AddStepsList } from '~/components/recipePageComponents/newRecipePage/addStepsList';
import { NewRecipePageHeader } from '~/components/recipePageComponents/newRecipePage/newRecipePageHeader';
import { BUTTONS } from '~/constants/recipes';
import { useCreateEditDeliteRecipe } from '~/hooks/useCreateEditDeliteRecipe';

export type FormData = {
    [key: string]: string;
};

export const NewRecipePage = () => {
    const {
        selectedTagsRecipe,
        ingredientsRecipe,
        stepsRecipe,
        setSelectedTags,
        setIngregientsRecipe,
        setStepsRecipe,
    } = useCreateEditDeliteRecipe();

    const {
        register,
        handleSubmit,
        trigger,
        clearErrors,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const publishRecipe = () => {};

    const onSaveDraft = async () => {
        clearErrors();
        const isValid = await trigger('nameRecipe', { shouldFocus: true });
        if (isValid) {
            console.log('Черновик сохранен:' + getValues('step'));
        }
    };

    return (
        <form onSubmit={handleSubmit(publishRecipe)} autoComplete='off'>
            <Flex direction='column'>
                <Box mt={{ base: '16px', lg: '56px' }} mb={{ base: '32px', lg: '40px' }}>
                    <NewRecipePageHeader
                        register={register}
                        clearErrors={clearErrors}
                        errors={errors}
                        getValue={getValues}
                        setValue={setValue}
                        selectedTags={selectedTagsRecipe}
                        setSelectedTags={setSelectedTags}
                    />
                </Box>

                <Center>
                    <Flex
                        direction='column'
                        w={{ base: '100%', md: '604px', lg: '658px', '2xl': '668px' }}
                    >
                        <AddIngredientsTable
                            register={register}
                            clearErrors={clearErrors}
                            getValues={getValues}
                            setValue={setValue}
                            errors={errors}
                            watch={watch}
                            ingredientsRecipe={ingredientsRecipe}
                            setIngregientsRecipe={setIngregientsRecipe}
                        />

                        <AddStepsList
                            register={register}
                            errors={errors}
                            clearErrors={clearErrors}
                            setValue={setValue}
                            stepsRecipe={stepsRecipe}
                            setStepsRecipe={setStepsRecipe}
                        />

                        <Flex
                            mb={{ base: '16px', lg: '32px' }}
                            flexWrap={{ base: 'wrap', md: 'nowrap' }}
                            justify='center'
                            gap='20px'
                        >
                            <Button
                                onClick={onSaveDraft}
                                w={{ base: '100%', md: 'fit-content' }}
                                size='lg'
                                variant='outline'
                                colorScheme='black'
                                leftIcon={<PencilIco />}
                            >
                                {BUTTONS.SAVE_DRAFT}
                            </Button>
                            <Button
                                type='submit'
                                w={{ base: '100%', md: 'fit-content' }}
                                size='lg'
                                variant='solid'
                                colorScheme='black'
                                bg='black'
                            >
                                {BUTTONS.PUBLISH_RECIPE}
                            </Button>
                        </Flex>
                    </Flex>
                </Center>
            </Flex>
        </form>
    );
};
