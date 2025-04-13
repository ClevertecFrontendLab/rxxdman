import { SearchIcon } from '@chakra-ui/icons';
import {
    Center,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Switch,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC } from 'react';

import { HeaderPageFilterIco } from '~/assets/createSvg';

import { AllergenSelect } from '../allergenSelect/allergenSelect';

interface IHeaderPagesProps {
    title: string;
    subtitle?: string;
}

export const HeaderPages: FC<IHeaderPagesProps> = ({ title, subtitle }) => {
    const icoSize = useBreakpointValue({
        base: 'sm',
        xl: 'lg',
    });

    return (
        <Center display='flex' flexDir='column' p={{ base: '16px 0 0 0', lg: '28px 0 32px 0' }}>
            <Heading
                as='h2'
                w='100%'
                fontWeight='700'
                fontSize={{ base: '24px', xl: '48px' }}
                lineHeight={{ base: '32px', xl: '48px' }}
                letterSpacing='1.2px'
                mb={subtitle ? { base: '16px', xl: '15px' } : { base: '16px', xl: '36px' }}
            >
                {title}
            </Heading>

            {subtitle && (
                <Text
                    color='blackAlpha.600'
                    maxW={{ base: '100%', xl: '696px' }}
                    fontWeight='500'
                    fontSize={{ base: '14px', xl: '16px' }}
                    lineHeight={{ base: '20px', xl: '24px' }}
                    mb={{ base: '16px', xl: '33px' }}
                >
                    {subtitle}
                </Text>
            )}

            <form id='HeaderPages__form' name='HeaderPages__form'>
                <Stack direction='row' gap='12px' mb={{ base: '0', lg: '16px' }}>
                    <IconButton
                        borderColor='rgba(0, 0, 0, 0.48)'
                        variant='outline'
                        size={icoSize}
                        aria-label='Search database'
                        icon={<HeaderPageFilterIco boxSize='24px' />}
                    />

                    <InputGroup
                        w={{ base: '100%', md: '408px', lg: '458px' }}
                        size={{ base: 'sm', xl: 'lg' }}
                    >
                        <InputRightElement pointerEvents='none'>
                            <SearchIcon />
                        </InputRightElement>

                        <Input
                            borderRadius='6px'
                            id='headerPages__input'
                            borderColor='rgba(0, 0, 0, 0.48)'
                            color='Lime.800'
                            minW='284px'
                            placeholder='Название или ингредиент...'
                            _placeholder={{
                                color: '#134b00;',
                            }}
                        />
                    </InputGroup>
                </Stack>

                <Stack
                    align='center'
                    justify='flex-end'
                    gap='16px'
                    direction='row'
                    display={{ base: 'none', lg: 'flex' }}
                >
                    <Stack align='center' gap='12px' direction='row'>
                        <FormLabel
                            pl='8px'
                            htmlFor='switchAllergen'
                            fontWeight='500'
                            fontSize='16px'
                            lineHeight='24px'
                            letterSpacing='.0'
                            m='0'
                        >
                            Исключить мои аллергены
                        </FormLabel>

                        <Switch id='switchAllergen' size='md' />
                    </Stack>

                    <AllergenSelect />
                </Stack>
            </form>
        </Center>
    );
};
