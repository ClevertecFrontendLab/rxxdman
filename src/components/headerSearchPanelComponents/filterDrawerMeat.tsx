import { Box, Checkbox, FormControl, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { meatsList } from '~/data/recipes';

interface IFilterDrawerMeatProps {
    selectedMeat: string[];
    setSelectedMeat: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterDrawerMeat: FC<IFilterDrawerMeatProps> = ({ selectedMeat, setSelectedMeat }) => {
    const toggleCheckbox = (meat: string) => {
        setSelectedMeat((prev) =>
            prev.includes(meat) ? prev.filter((item) => item !== meat) : [...prev, meat],
        );
    };

    return (
        <Box w='100%'>
            <Text fontWeight='500' fontSize='16px' lineHeight='24px' mb='12px'>
                Тип мяса:
            </Text>
            <FormControl>
                <VStack spacing='12px' align='stretch'>
                    {meatsList.map((meat) => (
                        <Box
                            key={meat.titleEn}
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='20px'
                            textAlign='left'
                        >
                            <Checkbox
                                id={meat.titleEn}
                                isChecked={selectedMeat.includes(meat.titleEn)}
                                onChange={() => toggleCheckbox(meat.titleEn)}
                                colorScheme='green'
                                size='md'
                                borderColor='rgba(215, 255, 148, 1)'
                            >
                                {meat.titleRu}
                            </Checkbox>
                        </Box>
                    ))}
                </VStack>
            </FormControl>
        </Box>
    );
};
