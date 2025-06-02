import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, List, ListItem, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import {
    FieldErrors,
    FieldValues,
    UseFormClearErrors,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';

import { StepRecipe } from '~/api/types/recipe';
import { BUTTONS, INPUTS } from '~/constants/recipes';

import { CardAddStep } from './cardAddStep';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;

    stepsRecipe: StepRecipe[];
    setStepsRecipe: React.Dispatch<React.SetStateAction<StepRecipe[]>>;
};

export const AddStepsList: FC<Props> = ({
    register,
    errors,
    clearErrors,
    setValue,
    stepsRecipe,
    setStepsRecipe,
}) => {
    useEffect(() => {
        if (!stepsRecipe.length)
            setStepsRecipe([
                {
                    id: Date.now() + '-' + Math.random().toString(36).substring(2),
                    stepNumber: 1,
                    description: '',
                },
            ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stepsRecipe.length]);

    const addNewStep = () => {
        const newStep = {
            id: Date.now() + '-' + Math.random().toString(36).substring(2),
            stepNumber: stepsRecipe.length + 1,
            description: '',
        } as StepRecipe;

        setStepsRecipe((steps) => [...steps, newStep]);

        console.log(stepsRecipe);

        if (errors.step) clearErrors('step');
    };

    return (
        <Box mb={{ base: '32px', lg: '40px' }} display='flex' flexDirection='column'>
            <Text
                fontWeight='600'
                fontSize={{ base: '14px', lg: '16px' }}
                lineHeight={{ base: '20px', lg: '24px' }}
                textAlign='left'
                mb='16px'
            >
                {INPUTS.STEPS_CONTAINER_TITLE}
            </Text>

            <List spacing='16px' styleType='none' mb='16px'>
                {stepsRecipe.map((step, index) => {
                    const id = Date.now() + '-' + Math.random().toString(36).substring(2);

                    const newStep = step.id
                        ? { ...stepsRecipe[index] }
                        : { ...stepsRecipe[index], id: id, stepNumber: index + 1 };

                    return (
                        <ListItem key={newStep.id}>
                            <CardAddStep
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                index={index}
                                step={newStep}
                                stepsCount={stepsRecipe.length}
                                setStepsRecipe={setStepsRecipe}
                            />
                        </ListItem>
                    );
                })}
            </List>

            <Button
                w='fit-content'
                alignSelf='flex-end'
                size='sm'
                variant='outline'
                colorScheme='black'
                p='6px 12px'
                rightIcon={
                    <AddIcon
                        h='14px'
                        w='14px'
                        color='white'
                        borderRadius={999}
                        bg='black'
                        p='2px'
                    />
                }
                onClick={addNewStep}
            >
                {BUTTONS.NEW_STEP}
            </Button>
        </Box>
    );
};
