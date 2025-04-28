import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { FC, useState } from 'react';

import { ingredientsList } from '~/data/recipes';

import { IngredientTableRow } from './ingredientsTableRow';

interface IIngredientTableProps {
    portions: number;
    ingredients: ingredientsList;
}

export const IngredientTable: FC<IIngredientTableProps> = ({ portions, ingredients }) => {
    const [portionsCount, setPortionsCount] = useState(portions);

    return (
        <TableContainer>
            <Table variant='striped' colorScheme='blackAlpha'>
                <Thead>
                    <Tr>
                        <Th
                            color='rgba(45, 177, 0, 1)'
                            fontWeight='700'
                            fontSize='12px'
                            lineHeight='16px'
                            p='20px 24px'
                        >
                            Ингридиенты
                        </Th>

                        <Th
                            color='rgba(45, 177, 0, 1)'
                            fontWeight='700'
                            fontSize='12px'
                            lineHeight='16px'
                            p='8px 0'
                            isNumeric
                        >
                            <Flex
                                gap={{ base: '12px', md: '16px' }}
                                align='center'
                                justify='flex-end'
                            >
                                <Text>Порций</Text>

                                <NumberInput
                                    onChange={(valueString) =>
                                        setPortionsCount(Number(valueString))
                                    }
                                    value={portionsCount}
                                    min={1}
                                    max={20}
                                    size='md'
                                    w='90px'
                                    color='rgba(0, 0, 0, 1)'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='24px'
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper data-test-id='increment-stepper' />
                                        <NumberDecrementStepper data-test-id='decrement-stepper' />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ingredient, index) => (
                        <IngredientTableRow
                            key={ingredient.title}
                            index={index}
                            portionsDefault={portions}
                            portionsSelect={portionsCount}
                            ingredient={ingredient}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
