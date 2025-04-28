import { Td, Tr } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { ingredient } from '~/data/recipes';

interface IIngredientTableRowProps {
    portionsDefault: number; //Количество порций в рецепте
    portionsSelect: number; //Желаемое количество порций
    ingredient: ingredient;
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
        <Tr fontWeight='500' fontSize='14px' lineHeight='20px'>
            <Td p={{ base: '10px 8px', md: '10px 24px', lg: '16px 24px' }} border='none'>
                {ingredient.title}
            </Td>

            <Td
                data-test-id={`ingredient-quantity-${index}`}
                p={{ base: '10px 12px', md: '10px 24px', lg: '16px 24px' }}
                border='none'
                isNumeric
            >
                {Number(ingredient.count) > 0 && count} {ingredient.measureUnit}
            </Td>
        </Tr>
    );
};
