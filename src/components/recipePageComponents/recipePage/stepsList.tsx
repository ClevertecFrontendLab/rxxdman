import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { FC } from 'react';

import { StepRecipe } from '~/api/types/recipe';

import { StepCard } from './stepCard';

interface IStepsListProps {
    steps: StepRecipe[];
}

export const StepsList: FC<IStepsListProps> = ({ steps }) => (
    <Box>
        <Heading
            fontWeight='500'
            fontSize={{ base: '24px', lg: '48px' }}
            lineHeight={{ base: '32px', lg: '48px' }}
            textAlign='left'
            mb='20px'
        >
            Шаги приготовления
        </Heading>

        <List spacing='20px' styleType='none'>
            {steps.map((step, index) => (
                <ListItem key={index}>
                    <StepCard step={step} lastElement={index === steps.length - 1 ? true : false} />
                </ListItem>
            ))}
        </List>
    </Box>
);
