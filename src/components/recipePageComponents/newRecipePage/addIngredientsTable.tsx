import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import {
    FieldErrors,
    FieldValues,
    UseFormClearErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { useCheckAuthQuery } from '~/api/query/authQuery';
import { useGetMeasureUnitsQuery } from '~/api/query/recipeQuery';
import { Ingredient } from '~/api/types/recipe';
import { INPUTS } from '~/constants/recipes';

import { IngredientRow } from './ingredientRow';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;

    ingredientsRecipe: Ingredient[];
    setIngregientsRecipe: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

export const AddIngredientsTable: FC<Props> = ({
    ingredientsRecipe,
    setIngregientsRecipe,
    register,
    errors,
    clearErrors,
    getValues,
    setValue,
    watch,
}) => {
    const { isSuccess: userLogin, status } = useCheckAuthQuery();
    const { data: MeasureUnits } = useGetMeasureUnitsQuery(
        {},
        { skip: !userLogin || status === 'pending' },
    );

    return (
        <Box mb={{ base: '32px', lg: '40px' }}>
            <Flex gap='8px' align='center' mb='16px'>
                <Text
                    fontWeight='600'
                    fontSize={{ base: '14px', lg: '16px' }}
                    lineHeight={{ base: '20px', lg: '24px' }}
                >
                    {INPUTS.ADD_INGREDIENT_CONTAINER_TITLE}
                </Text>
                <AddIcon w='16px' h='16px' borderRadius={999} outline='1px solid black' p='4px' />
            </Flex>

            <TableContainer overflow='hidden'>
                <Table variant='unstyled' colorScheme='blackAlpha'>
                    <Thead display={{ base: 'none', md: 'block' }} mb='16px'>
                        <Tr>
                            <Th p={0}>
                                <Flex
                                    gap='12px'
                                    color='rgba(45, 177, 0, 1)'
                                    fontWeight='700'
                                    fontSize='12px'
                                    lineHeight='16px'
                                >
                                    <Text w='295px' p='4px 24px'>
                                        {INPUTS.INGREDIENT_NAME_TITLE}
                                    </Text>
                                    <Text w='125px' p='4px 0'>
                                        {INPUTS.INGREDIENT_COUNT_TITLE}
                                    </Text>
                                    <Text w='203px'>{INPUTS.INGREDIENT_MEASURE_UNITS_TITLE}</Text>
                                </Flex>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody display='flex' flexDirection='column' gap={{ base: '12px', md: '16px' }}>
                        {ingredientsRecipe.map((ingredient, index) => {
                            const id = Date.now() + '-' + Math.random().toString(36).substring(2);

                            const newIngredient = ingredient.id
                                ? { ...ingredientsRecipe[index] }
                                : { ...ingredientsRecipe[index], id: id };

                            return (
                                <IngredientRow
                                    key={newIngredient.id}
                                    register={register}
                                    clearErrors={clearErrors}
                                    errors={errors}
                                    getValues={getValues}
                                    setValue={setValue}
                                    watch={watch}
                                    length={ingredientsRecipe.length}
                                    index={index}
                                    ingredient={newIngredient}
                                    setIngregientsRecipe={setIngregientsRecipe}
                                    type='delete'
                                    MeasureUnits={MeasureUnits}
                                />
                            );
                        })}

                        <IngredientRow
                            register={register}
                            clearErrors={clearErrors}
                            errors={errors}
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            length={ingredientsRecipe.length}
                            index={-1}
                            setIngregientsRecipe={setIngregientsRecipe}
                            type='add'
                            MeasureUnits={MeasureUnits}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};
