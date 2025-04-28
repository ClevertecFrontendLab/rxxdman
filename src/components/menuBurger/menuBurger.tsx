import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuList, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router';

import { BreadcrumbNav } from '../breadcrumb/breadcrumb';
import { Footerleft } from '../footer/footerLeft';
import { NavigationMenu } from '../navigationMenu/navigationMenu';

interface IMenuBurgerProps {
    isOpenMenuMobile: boolean;
    onToggle(): void;
    onClose(): void;
}

export const MenuBurger: FC<IMenuBurgerProps> = ({ isOpenMenuMobile, onToggle, onClose }) => {
    const location = useLocation();

    const isShow = useBreakpointValue({
        base: true,
        lg: false,
    });

    useEffect(() => {
        onClose();
    }, [location.pathname, onClose]);

    useEffect(() => {
        if (isOpenMenuMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('menu-open');
        };
    }, [isOpenMenuMobile]);

    return (
        <>
            {isOpenMenuMobile && (
                <Box
                    position='fixed'
                    top={{ base: '64px', lg: '80px' }}
                    left='0'
                    right='0'
                    bottom='0'
                    bg='rgba(0, 0, 0, 0.5)'
                    backdropFilter='blur(5px)'
                    zIndex={1000}
                />
            )}
            <Menu closeOnSelect={false} isOpen={isOpenMenuMobile}>
                <MenuButton
                    display={{ base: 'block', lg: 'none' }}
                    zIndex={2000}
                    as={IconButton}
                    size='lg'
                    variant='ghost'
                    isRound={true}
                    aria-label='Header burger'
                    icon={
                        isOpenMenuMobile ? (
                            <CloseIcon boxSize={3} data-test-id='close-icon' />
                        ) : (
                            <HamburgerIcon data-test-id='hamburger-icon' />
                        )
                    }
                    onClick={onToggle}
                    outline='none'
                    border='none'
                    boxShadow='none'
                    bg='transparent'
                    _focus={{ outline: 'none', border: 'none', bg: 'transparent' }}
                    _hover={{
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none',
                        bg: 'transparent',
                    }}
                />

                {(!isShow || isOpenMenuMobile) && (
                    <MenuList
                        data-test-id='nav'
                        display='flex'
                        flexDirection='column'
                        gap='12px'
                        overflowX='hidden'
                        overflowY='auto'
                        position='relative'
                        w='344px'
                        maxH='calc(100vh - 148px)'
                        right='8px'
                        top='1px'
                        bottom='84px'
                        bg='white'
                        pt='16px'
                        borderBottomRadius='12px'
                        zIndex={2000}
                    >
                        <Box w='344px'>
                            <BreadcrumbNav />
                        </Box>

                        <Box
                            overflowY='scroll'
                            p={{ base: '8px 32px 18px 10px', sm: '18px 16px 18px 10px' }}
                        >
                            {isShow && <NavigationMenu />}
                        </Box>

                        <Box pt='16px'>
                            <Footerleft />
                        </Box>
                    </MenuList>
                )}
            </Menu>
        </>
    );
};
