import { Box, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { nutritionValue } from '~/data/recipes';

import { NutritionValueAtribute } from './nutritionValueAtribute';

interface INutritionValueListProps {
    nutritionValue: nutritionValue;
}

export const NutritionValueList: FC<INutritionValueListProps> = ({ nutritionValue }) => (
    <Box>
        <Text
            fontWeight='400'
            fontSize='14px'
            lineHeight='20px'
            align='left'
            color='blackAlpha.800'
            mb={{ base: '12px', md: '20px' }}
        >
            * Калорийность на 1 порцию
        </Text>
        <Flex
            w='100%'
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '12px', '2xl': '24px' }}
        >
            <NutritionValueAtribute type='calories' value={nutritionValue.calories} />
            <NutritionValueAtribute type='proteins' value={nutritionValue.proteins} />
            <NutritionValueAtribute type='fats' value={nutritionValue.fats} />
            <NutritionValueAtribute type='carbohydrates' value={nutritionValue.carbohydrates} />
        </Flex>
    </Box>
);
