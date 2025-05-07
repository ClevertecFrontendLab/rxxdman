import { Avatar, Center, Flex, Text } from '@chakra-ui/react';

import {
    FOOTER_BUTTON_HOME,
    FOOTER_BUTTON_MY_PROFILE,
    FOOTER_BUTTON_RECORD,
    FOOTER_BUTTON_SEARCH,
} from '~/constants/footer';
import { users } from '~/mock/usersMock';

import { FooterAtribute } from './footerAtribute';

export const Footer = () => (
    <footer>
        <Flex w='100vw' overflow='hidden' bg='rgba(255, 255, 211, 1)' p='10px 0 9px 0'>
            <FooterAtribute title={FOOTER_BUTTON_HOME} ico='home' />

            <FooterAtribute title={FOOTER_BUTTON_SEARCH} ico='search' />

            <FooterAtribute title={FOOTER_BUTTON_RECORD} ico='write' />

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
                    {FOOTER_BUTTON_MY_PROFILE}
                </Text>
            </Center>
        </Flex>
    </footer>
);
