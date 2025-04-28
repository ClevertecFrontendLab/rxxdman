import { Image, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router';

export const Logo = React.memo(() => {
    const logoSrc = useBreakpointValue({
        base: '/src/assets/logo-mobile.svg',
        sm: '/src/assets/logo.svg',
    });

    return (
        <NavLink to='/'>
            <Image src={logoSrc} alt='logo' />
        </NavLink>
    );
});
