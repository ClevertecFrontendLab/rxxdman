import { AbsoluteCenter, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { h1 } from 'framer-motion/client';
import { Link } from 'react-router';

export const NotFoundPage = () => (
    <AbsoluteCenter>
        <Flex
            direction='column'
            align='center'
            p={{ base: '32px' }}
            w={{ base: '316px', lg: '396px' }}
        >
            <Image
                w={{ base: '108px', lg: '206px' }}
                h={{ base: '108px', lg: '206px' }}
                src='/src/assets/404.png'
                mb='32px'
            />
            <Heading
                as={h1}
                fontSize='24px'
                lineHeight='32px'
                fontWeight='700'
                color='black'
                mb='16px'
            >
                Упс! Такой страницы нет
            </Heading>
            <Text fontSize='16px' lineHeight='24px' fontWeight='400' color='blackAlpha.700'>
                Можете поискать другой рецепт{' '}
                <Link
                    data-test-id='error-page-go-home'
                    style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.64)', fontWeight: '400' }}
                    to='/'
                >
                    здесь.
                </Link>
            </Text>
        </Flex>
    </AbsoluteCenter>
);
