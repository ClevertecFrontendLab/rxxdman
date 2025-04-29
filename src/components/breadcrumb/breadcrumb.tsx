import './breadcrumb.css';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { categorListData } from '~/data/categor';
import { recipeListMock } from '~/data/recipes';

export const BreadcrumbNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);

    const isPopular = pathnames.find((value) => value === 'the-juiciest');

    const categor = categorListData.find((categor) => categor.link === pathnames[0]);
    const subcategor = categor?.subCategor.find((subCategor) => subCategor.link === pathnames[1]);
    const recipe = recipeListMock.find(
        (recipe) => recipe.id === (isPopular ? pathnames[1] : pathnames[2]),
    );

    useEffect(() => {
        if (pathnames.length > 0 && !isPopular && categor === undefined && subcategor === undefined)
            navigate(`/`);

        if (pathnames.length > 0 && !isPopular && categor !== undefined && subcategor === undefined)
            navigate(`/${categor.link}/${categor.subCategor[0].link}`);
    }, [categor, subcategor, isPopular, navigate, pathnames]);

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            className='breadctrumpNav'
            spacing='2px'
            separator={<ChevronRightIcon color='gray.500' />}
            p={{ base: '0 20px', lg: '0px' }}
            w='100%'
            display='flex'
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    whiteSpace='nowrap'
                    className='breadctrumpNav__link'
                    onClick={() => {
                        navigate(`/`);
                    }}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {categor && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        whiteSpace='nowrap'
                        className='breadctrumpNav__link'
                        onClick={() => navigate(`/${categor.link}/${categor.subCategor[0].link}`)}
                    >
                        {categor?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {categor && subcategor && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        whiteSpace='nowrap'
                        className='breadctrumpNav__link'
                        onClick={() => recipe && navigate(`/${categor.link}/${subcategor.link}`)}
                    >
                        {subcategor?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {categor && subcategor && recipe && (
                <BreadcrumbItem>
                    <BreadcrumbLink whiteSpace='wrap' className='breadctrumpNav__link'>
                        {recipe?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Самое сочное */}
            {isPopular && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className='breadctrumpNav__link'
                        whiteSpace='nowrap'
                        onClick={() => recipe && navigate(`/popular`)}
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isPopular && recipe && (
                <BreadcrumbItem>
                    <BreadcrumbLink className='breadctrumpNav__link' whiteSpace='wrap'>
                        {recipe?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
