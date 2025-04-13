import { Avatar, Center, Flex, Text } from '@chakra-ui/react';

import { users } from '~/data/user';

import { FooterAtribute } from './footerAtribute';

export const Footer = () => (
    <footer>
        <Flex w='100vw' overflow='hidden' bg='rgba(255, 255, 211, 1)' p='10px 0 9px 0'>
            <FooterAtribute title='Главная' ico='home' />

            <FooterAtribute title='Поиск' ico='search' />

            <FooterAtribute title='Записать' ico='write' />

            <Center
                display='flex'
                flexDirection='column'
                flexBasis='25%'
                pt='4px'
                color='blackAlpha.700'
                _hover={{ fontWeight: '500', color: 'black' }}
            >
                <Avatar
                    size='sm'
                    h='40px'
                    w='40px'
                    mb='4px'
                    name={users[0].name + ' ' + users[0].surname}
                    src={users[0].ico}
                />
                <Text fontSize='12px' lineHeight='16px'>
                    Мой профиль
                </Text>
            </Center>
        </Flex>
    </footer>
);
