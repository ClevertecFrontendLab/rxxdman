import { Flex, GridItem } from '@chakra-ui/react';

import { Footerleft } from '../footer/footerLeft';
import { MenuList } from '../menuList/menuList';

export const LeftPanel = () => (
    <Flex
        h='100%'
        w='100%'
        display='flex'
        flexDir='column'
        justify='space-between'
        pt='24px'
        pr='4px'
    >
        <GridItem
            rowSpan={1}
            colSpan={1}
            mt='10px'
            p='0 4px 10px 10px'
            flex='1'
            overflowY='auto'
            overflowX='hidden'
            sx={{
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'blackAlpha.300',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '8px',
                    height: '16px',
                },
            }}
        >
            <MenuList />
        </GridItem>

        <GridItem rowSpan={1} colSpan={1}>
            <Footerleft />
        </GridItem>
    </Flex>
);
