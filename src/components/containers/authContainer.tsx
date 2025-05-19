import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';

import { AUTH_DESCRIPTION } from '~/constants/auth/global';
import { COPYRIGHT_APP, RIGHT_TO_USE_APP } from '~/constants/footer';

import { AuthNavigation } from '../auth/authNavigation';

export const AuthContainer = () => (
    <Flex w='100vw' minH='100vh' overflowX='hidden' overflowY='auto'>
        <Box
            minH='100vh'
            flexBasis={{ base: '100%', lg: '50%' }}
            bgGradient='linear-gradient(236.9deg, #EAFFC7 30.27%, #29813F 136.1%)'
            position='relative'
        >
            <Center pt={{ base: '72px', md: '140px', lg: '170px', '2xl': '170px' }} mb='188px'>
                <Flex
                    direction='column'
                    w={{ base: '328px', md: '355px', lg: '451px', '2xl': '461px' }}
                    align='center'
                >
                    <Image
                        src='/src/assets/logo.svg'
                        alt='logo'
                        w={{ base: '158px', lg: '271px' }}
                        h={{ base: '38px', lg: '64px' }}
                        mb={{ base: '40px', md: '56px', lg: '80px' }}
                    />
                    <AuthNavigation />
                </Flex>
            </Center>

            <Text
                fontWeight='600'
                fontSize='12px'
                lineHeight='16px'
                color='black'
                position='absolute'
                bottom='30px'
                left='30px'
                textAlign='left'
            >
                {`${RIGHT_TO_USE_APP} ${COPYRIGHT_APP}`}
            </Text>
        </Box>

        <Box
            display={{ base: 'none', lg: 'block' }}
            minH='100vh'
            alignItems='stretch'
            flexBasis='50%'
            position='fixed'
            w='50%'
            right={0}
            overflow='hidden'
        >
            <Image
                src='src/assets/auth/authBack.jpg'
                alt='background'
                w='100%'
                h='100vh'
                objectFit='cover'
            />
            <Text
                zIndex={2}
                fontWeight='600'
                fontSize='12px'
                lineHeight='16px'
                color='black'
                position='fixed'
                top='auto'
                bottom='30px'
                right='30px'
            >
                {AUTH_DESCRIPTION}
            </Text>
        </Box>
    </Flex>
);
