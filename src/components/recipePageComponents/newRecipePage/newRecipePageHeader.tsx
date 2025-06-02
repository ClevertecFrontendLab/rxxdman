import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    Textarea,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import {
    FieldErrors,
    FieldValues,
    UseFormClearErrors,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';

import { IMAGE_API_URL } from '~/api/constants/apiConstant';
import { SubCategories } from '~/api/types/category';
import { INPUTS } from '~/constants/recipes';
import { useRecipePageImageSize } from '~/hooks/useRecipePageImageSize';

import { RecipeImage } from '../recipeImage';
import { ModalAddImage } from './modalAddImage';
import { SelectTags } from './selectTags';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    getValue: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;

    selectedTags: SubCategories;
    setSelectedTags: React.Dispatch<React.SetStateAction<SubCategories>>;
};

export const NewRecipePageHeader: FC<Props> = ({
    register,
    errors,
    clearErrors,
    setValue,
    getValue,
    selectedTags,
    setSelectedTags,
}) => {
    const { textHeight, textRef } = useRecipePageImageSize();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (errors.mainImageRecipe) clearErrors('mainImageRecipe');

        register('mainImageRecipe', {
            required: true,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card
            direction={{ base: 'column', md: 'row' }}
            variant='ghost'
            gap={{ base: '16px', lg: '24px' }}
            w='100%'
            minH={{ base: '224px', lg: '410px' }}
            flexShrink={1}
        >
            <RecipeImage
                alt='Выберите изображение рецепта'
                textHeight={textHeight}
                cursor='pointer'
                outline='1px solid black'
                imageUrl={getValue('mainImageRecipe') ? getValue('mainImageRecipe') : undefined}
                border={errors.mainImageRecipe ? '1px solid red' : 'none'}
                onClick={onOpen}
            />

            <ModalAddImage
                isOpen={isOpen}
                onClose={onClose}
                setValue={setValue}
                imagePath={
                    getValue('mainImageRecipe')
                        ? `${IMAGE_API_URL}${getValue('mainImageRecipe')}`
                        : '/src/assets/no-image.png'
                }
            />

            <Stack ref={textRef} w={{ base: '100%', lg: '503px', '2xl': '783px' }} gap='0'>
                <CardHeader p='0' mb={{ base: '16px', lg: '32px' }}>
                    <SelectTags
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                </CardHeader>

                <CardBody
                    display='flex'
                    flexDirection='column'
                    p='0'
                    textAlign='left'
                    mb='24px'
                    w='100%'
                    gap={{ base: '16px', lg: '24px' }}
                >
                    <FormControl isInvalid={!!errors.nameRecipe}>
                        <Input
                            w='100%'
                            size='lg'
                            borderColor='rgba(215, 255, 148, 1)'
                            borderRadius='6px'
                            placeholder={INPUTS.RECIPE_NAME_PLACEHOLDER}
                            _placeholder={{ color: 'blackAlpha.700' }}
                            _focus={{
                                border: errors.nameRecipe
                                    ? '1px solid rgba(229, 62, 62, 1)'
                                    : '1px solid rgba(49, 130, 206, 1)',
                                boxShadow: errors.nameRecipe
                                    ? 'rgb(229, 62, 62, 1) 0 0 0 1px'
                                    : 'rgb(49, 130, 206, 1) 0 0 0 1px',
                            }}
                            {...register('nameRecipe', {
                                required: true,
                                maxLength: {
                                    value: 50,
                                    message: 'Не более 50 символов',
                                },
                                onBlur: async (e) => {
                                    setValue('nameRecipe', e.target.value.trim());
                                },
                            })}
                        />
                    </FormControl>

                    <FormControl isInvalid={!!errors.descriptionRecipe}>
                        <Textarea
                            placeholder={INPUTS.RECIPE_DESCRIPTION_PLACEHOLDER}
                            size='sm'
                            h='80px'
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='20px'
                            color='blackAlpha.700'
                            {...register('descriptionRecipe', {
                                required: true,
                                maxLength: {
                                    value: 500,
                                    message: 'Не более 500 символов',
                                },

                                onBlur: async (e) => {
                                    setValue('descriptionRecipe', e.target.value.trim());
                                },
                            })}
                        />
                    </FormControl>

                    <Flex gap={{ base: '12px', md: '16px' }} align='center'>
                        <Text
                            fontWeight='600'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight={{ base: '20px', lg: '24px' }}
                        >
                            {INPUTS.NUMBER_OF_PORTIONS_TITLE}
                        </Text>

                        <FormControl isInvalid={!!errors.portionsRecipe}>
                            <NumberInput
                                defaultValue={INPUTS.NUMBER_OF_PORTIONS_DEFAULT_VALUE}
                                onBlur={async (portions) => {
                                    setValue('portionsRecipe', portions);
                                }}
                                size='md'
                                w='90px'
                                color='rgba(0, 0, 0, 1)'
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='24px'
                                min={1}
                                max={10000}
                            >
                                <NumberInputField
                                    {...register('portionsRecipe', {
                                        required: true,
                                        min: {
                                            value: 1,
                                            message: 'Минимальное значение — 1',
                                        },
                                        max: {
                                            value: 10000,
                                            message: 'Максимальное значение — 10000',
                                        },
                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper data-test-id='' />
                                    <NumberDecrementStepper data-test-id='' />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>

                    <Flex gap={{ base: '12px', md: '16px' }} align='center'>
                        <Text
                            fontWeight='600'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight={{ base: '20px', lg: '24px' }}
                        >
                            {INPUTS.COOKING_TIME_MINUTES_TITLE}
                        </Text>

                        <FormControl isInvalid={!!errors.minutesRecipe}>
                            <NumberInput
                                defaultValue={INPUTS.COOKING_TIME_MINUTES_DEFAULT_VALUE}
                                onBlur={async (minutes) => {
                                    setValue('minutesRecipe', minutes);
                                }}
                                min={1}
                                max={10000}
                                size='md'
                                w='90px'
                                color='rgba(0, 0, 0, 1)'
                                fontWeight='600'
                                fontSize='16px'
                                lineHeight='24px'
                            >
                                <NumberInputField
                                    {...register('minutesRecipe', {
                                        required: true,
                                        min: {
                                            value: 1,
                                            message: 'Минимальное значение — 1',
                                        },
                                        max: {
                                            value: 10000,
                                            message: 'Максимальное значение — 10000',
                                        },
                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper data-test-id='' />
                                    <NumberDecrementStepper data-test-id='' />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>
                </CardBody>
            </Stack>
        </Card>
    );
};
