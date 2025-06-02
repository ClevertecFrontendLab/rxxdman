/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon } from '@chakra-ui/icons';
import {
    FormControl,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    Td,
    Tr,
} from '@chakra-ui/react';
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

import { Ingredient } from '~/api/types/recipe';
import { GetMeasureUnitsResponse } from '~/api/types/responce';
import { FormData } from '~/app/pages/newRecipePage';
import { DeleteIco } from '~/assets/createSvg';
import { INPUTS } from '~/constants/recipes';
import { mockMeasureUnits } from '~/mock/measureUnits';

type ingredientRowType = 'add' | 'delete';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    watch: UseFormWatch<FieldValues>;

    MeasureUnits?: GetMeasureUnitsResponse;
    index: number;
    length: number;
    ingredient?: Ingredient;
    setIngregientsRecipe: React.Dispatch<React.SetStateAction<Ingredient[]>>;
    type?: ingredientRowType;
};

export const IngredientRow: FC<Props> = ({
    index,
    length,
    ingredient,
    setIngregientsRecipe,
    type = 'delete',
    MeasureUnits,
    register,
    errors,
    clearErrors,
    getValues,
    setValue,
    watch,
}) => {
    const formId = ingredient?.id || 'add';

    const deleteIngredient = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setIngregientsRecipe((ingredients) =>
            ingredients.filter((ingredientInTheList) => ingredientInTheList.id != ingredient?.id),
        );
    };

    const addIngredient = () => {
        const newIngredient = {
            id: Date.now() + '-' + Math.random().toString(36).substring(2),
            title: getValues('ingredient.add.name'),
            count: getValues('ingredient.add.count'),
            measureUnit: getValues('ingredient.add.measureUnit'),
        } as Ingredient;

        setIngregientsRecipe((ingredients) => [...ingredients, newIngredient]);

        console.log(getValues('ingredient.add'));

        setValue('ingredient.add.name', '');
        setValue('ingredient.add.count', '');
        setValue('ingredient.add.measureUnit', '');

        if (errors.ingredient) clearErrors('ingredient');
    };

    return (
        <Tr fontWeight='400' fontSize='16px' lineHeight='24px' w='100%' overflow='hidden'>
            <Td
                p={0}
                display='flex'
                gap={{ base: '12px', lg: '16px' }}
                w='100%'
                align='center'
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
                <FormControl
                    w={{ base: '100%', md: '241px', lg: '283px', '2xl': '293px' }}
                    isInvalid={!!errors.ingredient?.[formId]?.name}
                >
                    <Input
                        placeholder={INPUTS.INGREDIENT_NAME_PLACEHOLDER}
                        defaultValue={ingredient?.title}
                        size='md'
                        {...register(`ingredient.${formId}.name`, {
                            required:
                                formId === 'add' && length === 0
                                    ? true
                                    : formId === 'add' && length > 0
                                      ? false
                                      : true,
                            maxLength: {
                                value: 50,
                                message: 'Не более 50 символов',
                            },
                            onBlur: (e) => {
                                setIngregientsRecipe((ingredients) =>
                                    ingredients.map((ingredient, indx) =>
                                        indx === index
                                            ? { ...ingredient, title: e.target.value }
                                            : ingredient,
                                    ),
                                );
                            },
                        })}
                    />
                </FormControl>

                <FormControl
                    w={{ base: '80px' }}
                    size='md'
                    isInvalid={!!errors.ingredient?.[formId]?.count}
                >
                    <NumberInput
                        defaultValue={ingredient?.count}
                        value={watch(`ingredient.${formId}.count`)}
                        {...register(`ingredient.${formId}.count`, {
                            required:
                                formId === 'add' && length === 0
                                    ? true
                                    : formId === 'add' && length > 0
                                      ? false
                                      : true,
                            min: {
                                value: 1,
                                message: 'Минимальное значение — 1',
                            },
                            max: {
                                value: 10000,
                                message: 'Максимальное значение — 10000',
                            },
                            onBlur: async (e) => {
                                setIngregientsRecipe((ingredients) =>
                                    ingredients.map((ingredient, indx) =>
                                        indx === index
                                            ? { ...ingredient, count: e.target.value }
                                            : ingredient,
                                    ),
                                );
                            },
                        })}
                        onChange={(valueAsString, valueAsNumber) => {
                            setValue(`ingredient.${formId}.count`, valueAsNumber);
                        }}
                        min={1}
                        max={10000}
                    >
                        <NumberInputField placeholder={INPUTS.INGREDIENT_COUNT_PLACEHOLDER} />
                    </NumberInput>
                </FormControl>

                <Select
                    p={0}
                    w={{ base: '192px', md: '215px' }}
                    defaultValue={ingredient?.measureUnit || ''}
                    color={
                        getValues(`ingredient.${formId}.measureUnit`) === ''
                            ? 'rgba(0, 0, 0, 0.64)'
                            : 'rgba(45, 55, 72, 1)'
                    }
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    border={
                        errors.ingredient?.[formId]?.measureUnit
                            ? '1px solid red'
                            : '1px solid rgba(0, 0, 0, 0.08)'
                    }
                    {...register(`ingredient.${formId}.measureUnit`, {
                        required:
                            formId === 'add' && length === 0
                                ? true
                                : formId === 'add' && length > 0
                                  ? false
                                  : true,

                        onBlur: async (e) => {
                            setIngregientsRecipe((ingredients) =>
                                ingredients.map((ingredient, indx) =>
                                    indx === index
                                        ? { ...ingredient, measureUnit: e.target.value }
                                        : ingredient,
                                ),
                            );
                        },
                    })}
                >
                    <option hidden disabled value=''>
                        {INPUTS.INGREDIENT_MEASURE_UNITS_PLACEHOLDER}
                    </option>

                    {MeasureUnits
                        ? MeasureUnits.map((measureUnit) => (
                              <option key={measureUnit._id} value={measureUnit.name}>
                                  {measureUnit.name}
                              </option>
                          ))
                        : mockMeasureUnits.map((measureUnit) => (
                              <option key={measureUnit._id} value={measureUnit.name}>
                                  {measureUnit.name}
                              </option>
                          ))}
                </Select>

                <IconButton
                    onClick={type === 'add' ? addIngredient : deleteIngredient}
                    size='sm'
                    w='32px'
                    h='32px'
                    variant={type === 'add' ? 'ghost' : 'solid'}
                    borderRadius='50px'
                    bgColor={type === 'add' ? 'black' : 'transparent'}
                    color={type === 'add' ? 'rgba(255, 255, 211, 1)' : 'rgba(45, 177, 0, 1)'}
                    _hover={{
                        bgColor: type === 'add' ? 'green' : 'transparent',
                    }}
                    _focus={{
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                    }}
                    colorScheme='teal'
                    aria-label='add or delete ingredient'
                    icon={type === 'add' ? <AddIcon w='14px' h='14px' /> : <DeleteIco />}
                />
            </Td>
        </Tr>
    );
};
