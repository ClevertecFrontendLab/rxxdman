import { Box, Checkbox, FormControl, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { garnishList } from '~/data/drawerData';

interface IFilterDrawerGarnishProps {
    selectedGarnish: string[];
    setSelectedGarnish: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterDrawerGarnish: FC<IFilterDrawerGarnishProps> = ({
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
                Тип гарнира:
            </Text>
            <FormControl>
                <VStack spacing='12px' align='stretch'>
                    {garnishList.map((garnish) => (
                        <Box
                            key={garnish.titleRu}
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='20px'
                            textAlign='left'
                        >
                            <Checkbox
                                data-test-id={`checkbox-${garnish.titleRu.toLowerCase()}`}
                                id={garnish.titleRu}
                                isChecked={selectedGarnish.includes(garnish.titleRu)}
                                onChange={() => toggleCheckbox(garnish.titleRu)}
                                variant='limeCheckbox'
                                size='md'
                                borderColor='rgba(215, 255, 148, 1)'
                            >
                                {garnish.titleRu}
                            </Checkbox>
                        </Box>
                    ))}
                </VStack>
            </FormControl>
        </Box>
    );
};
