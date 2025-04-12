import { Flex, GridItem } from '@chakra-ui/react';

import { Footerleft } from '../footer/footerLeft';
import { MenuList } from '../menuList/menuList';

export const LeftPanel = () => (
    <Flex h='100%' w='100%' display='flex' flexDir='column' justify='space-between'>
        <GridItem rowSpan={1} colSpan={1} pt='24px'>
            <MenuList />
        </GridItem>

        <GridItem rowSpan={1} colSpan={1}>
            <Footerleft />
        </GridItem>
    </Flex>
);
