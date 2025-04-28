import { Card, CardBody, CardHeader, Image, Stack, Tag, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { stepRecipe } from '~/data/recipes';

interface IStepCardProps {
    lastElement?: boolean;
    step: stepRecipe;
}

export const StepCard: FC<IStepCardProps> = ({ lastElement, step }) => (
    <Card
        direction='row'
        overflow='hidden'
        variant='outline'
        w='100%'
        maxH={{ base: '128px', lg: '244px' }}
    >
        {step.image && (
            <Image
                objectFit='cover'
                src={step.image}
                alt={step.description}
                w={{ base: '158px', lg: '158px', xl: '346px' }}
                h={{ base: '128px', lg: '244px' }}
                flexShrink={0}
            />
        )}

        <Stack
            gap={{ base: '12px', lg: '16px' }}
            p={{ base: '8px', lg: '20px 24px' }}
            textAlign='left'
        >
            <CardHeader p='0'>
                <Tag p='2px 8px' bg={lastElement ? 'rgba(255, 255, 211, 1)' : 'blackAlpha.100'}>
                    <Text fontSize='14' fontWeight='400' lineHeight='20px' whiteSpace='nowrap'>
                        Шаг {step.stepNumber}
                    </Text>
                </Tag>
            </CardHeader>

            <CardBody p='0'>
                <Text fontSize='14' fontWeight='400' lineHeight='20px'>
                    {step.description}
                </Text>
            </CardBody>
        </Stack>
    </Card>
);
