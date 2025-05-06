import './breadcrumb.css';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/API/categorsApi';
import { useGetRecipeIdQuery } from '~/API/recipeApi';

export const BreadcrumbNav: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);
    const isPopular = pathnames.find((value) => value === 'the-juiciest');

    const { data: categories } = useGetCategoriesQuery();

    const categor = categories && categories.find((categor) => categor.category === pathnames[0]);
    const subcategor =
        categories && categories.find((categor) => categor.category === pathnames[1]);

    const { data: popularRecipe } = useGetRecipeIdQuery(pathnames[1], {
        skip: !isPopular || !pathnames[1],
    });

    const { data: categoriesRecipe } = useGetRecipeIdQuery(pathnames[2], {
        skip: !categor || !subcategor || !pathnames[2],
    });

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
                        onClick={() =>
                            categor.subCategories &&
                            navigate(`/${categor.category}/${categor.subCategories[0].category}`)
                        }
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
                        onClick={() =>
                            categoriesRecipe &&
                            navigate(`/${categor.category}/${subcategor.category}`)
                        }
                    >
                        {subcategor?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {categor && subcategor && categoriesRecipe && pathnames[2] && (
                <BreadcrumbItem>
                    <BreadcrumbLink whiteSpace='wrap' className='breadctrumpNav__link'>
                        {categoriesRecipe.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {/* Самое сочное */}
            {isPopular && (
                <BreadcrumbItem>
                    <BreadcrumbLink
                        className='breadctrumpNav__link'
                        whiteSpace='nowrap'
                        onClick={() => popularRecipe && navigate(`/popular`)}
                    >
                        Самое сочное
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isPopular && popularRecipe && pathnames[1] && (
                <BreadcrumbItem>
                    <BreadcrumbLink className='breadctrumpNav__link' whiteSpace='wrap'>
                        {popularRecipe?.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
