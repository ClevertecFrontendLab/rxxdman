import { HamburgerIcon } from '@chakra-ui/icons';
import { Grid, GridItem, HStack, IconButton, Image, useBreakpointValue } from '@chakra-ui/react';

import { BreadcrumbNav } from '../breadcrumb/breadcrumb';
import { ProfileNotification } from '../profileNotification/profileNotification';
import { UserCard } from '../userCard/userCard';

export const Header = () => {
    const logoSrc = useBreakpointValue({
        base: '/src/assets/logo-mobile.svg',
        sm: '/src/assets/logo.svg',
    });

    return (
        <header data-test-id='header'>
            <Grid
                width='100vw'
                overflow='hidden'
                alignItems='center'
                bg='rgba(255, 255, 211, 1)'
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
                <GridItem area='logo'>
                    <Image src={logoSrc} alt='logo' />
                </GridItem>

                <GridItem area='breadcrumb' mr='auto' display={{ base: 'none', lg: 'block' }}>
                    <BreadcrumbNav />
                </GridItem>

                <GridItem pl='53px' area='user' display={{ base: 'none', lg: 'block' }}>
                    <UserCard id='0' />
                </GridItem>

                <GridItem area='menuMobile' display={{ base: 'block', lg: 'none' }}>
                    <HStack gap='0'>
                        <ProfileNotification />
                        <IconButton
                            size='lg'
                            variant='ghost'
                            isRound={true}
                            aria-label='Header burger'
                            _focus={{ outline: 'none', border: 'none' }}
                            icon={<HamburgerIcon />}
                        />
                    </HStack>
                </GridItem>
            </Grid>
        </header>
    );
};
