import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuList, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
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

    const [pathtest, setpathtest] = useState('');

    const isShow = useBreakpointValue({
        base: true,
        lg: false,
    });

    useEffect(() => {
        if (pathtest.split('/').length > location.pathname.split('/').length)
            //Эмуляция
            onClose();

        setpathtest(location.pathname);
    }, [location.pathname, onClose, pathtest]);

    useEffect(() => {
        if (isOpenMenuMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpenMenuMobile]);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            <Box ref={menuRef}>
                <Menu closeOnSelect={false} isOpen={isOpenMenuMobile}>
                    <MenuButton
                        display={{ base: 'block', lg: 'none' }}
                        data-test-id={isOpenMenuMobile ? 'close-icon' : 'hamburger-icon'}
                        zIndex={2000}
                        as={IconButton}
                        size='lg'
                        variant='ghost'
                        isRound={true}
                        aria-label='Header burger'
                        icon={isOpenMenuMobile ? <CloseIcon boxSize={3} /> : <HamburgerIcon />}
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
            </Box>
        </>
    );
};
