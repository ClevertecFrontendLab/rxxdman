import { Box, Grid, GridItem, HStack, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import { BreadcrumbNav } from '../breadcrumb/breadcrumb';
import { Logo } from '../logo/logo';
import { MenuBurger } from '../menuBurger/menuBurger';
import { ProfileNotification } from '../profileNotification/profileNotification';
import { UserCard } from '../userCard/userCard';

export const Header = memo(() => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const isShowTest = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <header>
            <Grid
                width='100vw'
                overflow='hidden'
                alignItems='center'
                bg={isOpen ? 'white' : 'rgba(255, 255, 211, 1)'}
                p={{ base: '8px 16px', sm: '8px 20px', lg: '16px 56px 16px 16px' }}
                templateAreas={{
                    base: `"logo gap menuMobile"`,
                    sm: `"logo gap menuMobile"`,
                    lg: `"logo breadcrumb user"`,
                }}
                templateColumns={{
                    base: '40px 1fr auto',
                    sm: '143.11px 1fr auto',
                    lg: '263.2px 1fr 432px',
                }}
            >
                <GridItem area='logo' zIndex='10000'>
                    <Logo />
                </GridItem>

                <GridItem area='breadcrumb' mr='auto' display={{ base: 'none', lg: 'block' }}>
                    {isShowTest && <BreadcrumbNav />}
                </GridItem>

                <GridItem pl='53px' area='user' display={{ base: 'none', lg: 'block' }}>
                    <UserCard id='0' />
                </GridItem>

                <GridItem area='menuMobile'>
                    <HStack gap='0'>
                        <Box display={{ base: isOpen ? 'none' : 'block', lg: 'none' }}>
                            <ProfileNotification />
                        </Box>

                        <MenuBurger
                            isOpenMenuMobile={isOpen}
                            onToggle={onToggle}
                            onClose={onClose}
                        />
                    </HStack>
                </GridItem>
            </Grid>
        </header>
    );
});
