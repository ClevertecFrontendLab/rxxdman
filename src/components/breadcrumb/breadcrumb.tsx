import './breadcrumb.css';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { categorListData } from '~/data/categor';

export const BreadcrumbNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);

    const isCatalog = pathnames.find((value) => value === 'catalog');
    const isPopular = pathnames.find((value) => value === 'popular');

    const currentMenuItem = categorListData.find((categor) => categor.link === pathnames[1]);

    const currentItemText = currentMenuItem?.subCategor[Number(pathnames[2])];

    useEffect(() => {
        if (isCatalog && currentMenuItem === undefined && currentItemText === undefined)
            navigate(`/`);

        if (isCatalog && currentMenuItem !== undefined && currentItemText === undefined)
            navigate(`/catalog/${pathnames[1]}/0`);
    }, [currentItemText, currentMenuItem, isCatalog, navigate, pathnames]);

    return (
        <Breadcrumb
            w='100%'
            className='breadctrumpNav'
            spacing='2px'
            separator={<ChevronRightIcon color='gray.500' />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    fontSize='16px'
                    lineHeight='24px'
                    className='breadctrumpNav__link'
                    onClick={() => navigate(`/`)}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Работа с каталогом */}
            {isCatalog && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        fontSize='16px'
                        lineHeight='24px'
                        className='breadctrumpNav__link'
                        onClick={() => navigate(`/catalog/${pathnames[1]}/0`)}
                    >
                        {currentMenuItem?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
            {isCatalog && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        fontSize='16px'
                        lineHeight='24px'
                        className='breadctrumpNav__link'
                    >
                        {currentItemText?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Самое сочное */}
            {isPopular && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        fontSize='16px'
                        lineHeight='24px'
                        className='breadctrumpNav__link'
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* 
        {pathnames.map((value, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
                <BreadcrumbItem key={path}>
                    <BreadcrumbLink className="breadctrumpNav__link" href={path}>
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            );
        })} */}
        </Breadcrumb>
    );
};
