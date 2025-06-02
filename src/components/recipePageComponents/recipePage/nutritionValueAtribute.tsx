import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

type NutritionValueType = 'calories' | 'proteins' | 'fats' | 'carbohydrates';

interface INutritionValueAtributeProps {
    type: NutritionValueType;
    value: number;
}

export const NutritionValueAtribute: FC<INutritionValueAtributeProps> = ({ type, value }) => (
    <Flex
        basis={{ base: '100%', md: '25%' }}
        direction={{ base: 'row', md: 'column' }}
        align='center'
        gap={{ base: '4px', '2xl': '12px' }}
        p={{ base: '16px 12px', md: '16px' }}
        borderRadius='16px'
        outline='1px solid rgba(0, 0, 0, 0.08)'
    >
        <Text
            fontWeight='400'
            fontSize='14px'
            lineHeight='20px'
            color='rgba(0, 0, 0, 0.48)'
            width={{ base: '117.5px', md: 'fit-content' }}
            align={{ base: 'left', md: 'center' }}
        >
            {type === 'calories' && `калорийность`}
            {type === 'proteins' && `Белки`}
            {type === 'fats' && `Жиры`}
            {type === 'carbohydrates' && `Углеводы`}
        </Text>
        <Text
            fontWeight='500'
            fontSize={{ base: '24px', md: '36px' }}
            lineHeight={{ base: '32px', md: '40px' }}
            color='rgba(19, 75, 0, 1)'
            width={{ base: '117.5px', md: 'fit-content' }}
        >
            {value}
        </Text>
        <Text
            fontWeight='600'
            fontSize={{ base: '12px', md: '14px' }}
            lineHeight={{ base: '16px', md: '20px' }}
            color='rrgba(0, 0, 0, 0.92)'
        >
            {type === 'calories' ? 'ККАЛ' : 'ГРАММ'}
        </Text>
    </Flex>
);
