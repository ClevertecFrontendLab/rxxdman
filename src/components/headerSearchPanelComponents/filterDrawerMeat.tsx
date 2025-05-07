import { Box, Checkbox, FormControl, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { DRAWER_MEAT_TITLE } from '~/constants/drawer';
import { meatsList } from '~/data/filterMeats';

type FilterDrawerMeatProps = {
    selectedMeat: string[];
    setSelectedMeat: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterDrawerMeat: FC<FilterDrawerMeatProps> = ({ selectedMeat, setSelectedMeat }) => {
    const toggleCheckbox = (meat: string) => {
        setSelectedMeat((prev) =>
            prev.includes(meat) ? prev.filter((item) => item !== meat) : [...prev, meat],
        );
    };

    return (
        <Box w='100%'>
            <Text fontWeight='500' fontSize='16px' lineHeight='24px' mb='12px'>
                {DRAWER_MEAT_TITLE}
            </Text>
            <FormControl>
                <VStack spacing='12px' align='stretch'>
                    {meatsList.map((meat) => (
                        <Box
                            key={meat.title}
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='20px'
                            textAlign='left'
                        >
                            <Checkbox
                                id={meat.value}
                                isChecked={selectedMeat.includes(meat.title)}
                                onChange={() => toggleCheckbox(meat.title)}
                                variant='limeCheckbox'
                                size='md'
                                borderColor='rgba(215, 255, 148, 1)'
                            >
                                {meat.title}
                            </Checkbox>
                        </Box>
                    ))}
                </VStack>
            </FormControl>
        </Box>
    );
};
