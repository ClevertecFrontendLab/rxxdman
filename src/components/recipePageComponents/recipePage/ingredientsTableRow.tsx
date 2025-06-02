import { Flex, Td, Text, Tr } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { Ingredient } from '~/api/types/recipe';

interface IIngredientTableRowProps {
    portionsDefault: number; //Количество порций в рецепте
    portionsSelect: number; //Желаемое количество порций
    ingredient: Ingredient;
    index: number;
}

export const IngredientTableRow: FC<IIngredientTableRowProps> = ({
    portionsDefault,
    portionsSelect,
    ingredient,
    index,
}) => {
    const [count, setCount] = useState(Number(ingredient.count));

    useEffect(() => {
        if (portionsSelect != portionsDefault) {
            const newCount = (Number(ingredient.count) / portionsDefault) * portionsSelect;
            setCount(newCount);
        } else {
            setCount(Number(ingredient.count));
        }
    }, [ingredient.count, portionsDefault, portionsSelect]);

    return (
        <Tr fontWeight='500' fontSize='14px' lineHeight='20px' w='100%' overflow='hidden'>
            <Td>
                <Flex
                    p={{ base: '10px 8px', md: '10px 24px', lg: '16px 24px' }}
                    justify='space-between'
                    overflow='hidden'
                    w='100%'
                >
                    <Text whiteSpace='wrap' w='fit-content'>
                        {ingredient.title}
                    </Text>
                    <Text data-test-id={`ingredient-quantity-${index}`}>
                        {Number(ingredient.count) > 0 && count} {ingredient.measureUnit}
                    </Text>
                </Flex>
            </Td>
        </Tr>
    );
};
