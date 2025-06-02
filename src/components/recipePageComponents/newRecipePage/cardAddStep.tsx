/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Card,
    CardBody,
    CardHeader,
    FormControl,
    Image,
    Stack,
    Tag,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IMAGE_API_URL } from '~/api/constants/apiConstant';
import { StepRecipe } from '~/api/types/recipe';
import { DeleteIco } from '~/assets/createSvg';
import { INPUTS } from '~/constants/recipes';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;

    index: number;
    step: StepRecipe;
    setStepsRecipe: React.Dispatch<React.SetStateAction<StepRecipe[]>>;
    stepsCount: number;
};

export const CardAddStep: FC<Props> = ({
    register,
    errors,
    setValue,
    step,
    stepsCount,
    setStepsRecipe,
}) => {
    const deleteStep = () => {
        setStepsRecipe((steps) => {
            const filteredSteps = steps.filter((stepInTheList) => stepInTheList.id != step.id);
            const updateSteps = filteredSteps.map((stepInTheList, indx) => ({
                ...stepInTheList,
                stepNumber: indx + 1,
            }));
            return updateSteps;
        });
    };

    return (
        <Card
            direction='row'
            overflow='hidden'
            variant='outline'
            w='100%'
            borderRadius='8px'
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
        >
            <Image
                objectFit='cover'
                src={step.image ? `${IMAGE_API_URL}/${step.image}` : '/src/assets/no-image.png'}
                alt={step.description || `Изображение шага ${step.stepNumber}`}
                w={{ base: '100%', md: '50%' }}
                h={{ base: step?.image ? '128px' : '160px', lg: step?.image ? '244px' : '160px' }}
                flexShrink={0}
                borderRadius='8px'
            />

            <Stack gap='16px' p='20px' textAlign='left' w='100%'>
                <CardHeader p='0' display='flex' justifyContent='space-between' alignItems='center'>
                    <Tag p='2px 8px' size='sm' bg='blackAlpha.100'>
                        <Text fontSize='12' fontWeight='400' lineHeight='16px' whiteSpace='nowrap'>
                            Шаг {step.stepNumber}
                        </Text>
                    </Tag>

                    {stepsCount > 1 && (
                        <DeleteIco h='14px' w='14px' cursor='pointer' onClick={deleteStep} />
                    )}
                </CardHeader>

                <CardBody p='0'>
                    <FormControl isInvalid={!!errors.step?.[step.id]?.description}>
                        <Textarea
                            h='84px'
                            w='100%'
                            fontSize='14'
                            fontWeight='400'
                            lineHeight='20px'
                            placeholder={INPUTS.STEP}
                            {...register(`step.${step.id}.description`, {
                                required: true,
                                maxLength: {
                                    value: 50,
                                    message: 'Не более 50 символов',
                                },

                                onBlur: async (e) => {
                                    setValue(`step.${step.id}.description`, e.target.value);
                                    setStepsRecipe((steps) =>
                                        steps.map((stepInTheList, indx) =>
                                            stepInTheList.id === step.id
                                                ? { ...stepInTheList, description: e.target.value }
                                                : stepInTheList,
                                        ),
                                    );
                                },
                            })}
                            onChange={(e) => {
                                setValue(`step.${step.id}.description`, e.target.value);
                            }}
                        />
                    </FormControl>
                </CardBody>
            </Stack>
        </Card>
    );
};
