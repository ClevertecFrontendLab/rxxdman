import { Flex, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { memo } from 'react';

import { Footerleft } from '../footer/footerLeft';
import { NavigationMenu } from '../navigationMenu/navigationMenu';

export const LeftPanel = memo(() => {
    const isShow = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <Flex
            h='100%'
            w='256px'
            display='flex'
            flexDir='column'
            justify='space-between'
            pt='24px'
            pr='4px'
            boxShadow='0px 2px 1px -1px rgba(0, 0, 0, 0.2),  0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
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
                {isShow && <NavigationMenu />}
            </GridItem>

            <GridItem rowSpan={1} colSpan={1}>
                <Footerleft />
            </GridItem>
        </Flex>
    );
});
