import { Box, Checkbox, FormControl, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { DRAWER_GARNISH_TITLE } from '~/constants/drawer';
import { garnishList } from '~/data/filterGarnish';

type FilterDrawerGarnishProps = {
    selectedGarnish: string[];
    setSelectedGarnish: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterDrawerGarnish: FC<FilterDrawerGarnishProps> = ({
    selectedGarnish,
    setSelectedGarnish,
}) => {
    const toggleCheckbox = (garnish: string) => {
        setSelectedGarnish((prev) =>
            prev.includes(garnish) ? prev.filter((item) => item !== garnish) : [...prev, garnish],
        );
    };

    return (
        <Box w='100%'>
            <Text fontWeight='500' fontSize='16px' lineHeight='24px' mb='12px'>
                {DRAWER_GARNISH_TITLE}
            </Text>
            <FormControl>
                <VStack spacing='12px' align='stretch'>
                    {garnishList.map((garnish) => (
                        <Box
                            key={garnish.title}
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='20px'
                            textAlign='left'
                        >
                            <Checkbox
                                data-test-id={`checkbox-${garnish.title.toLowerCase()}`}
                                id={garnish.value}
                                isChecked={selectedGarnish.includes(garnish.title)}
                                onChange={() => toggleCheckbox(garnish.title)}
                                variant='limeCheckbox'
                                size='md'
                                borderColor='rgba(215, 255, 148, 1)'
                            >
                                {garnish.title}
                            </Checkbox>
                        </Box>
                    ))}
                </VStack>
            </FormControl>
        </Box>
    );
};
