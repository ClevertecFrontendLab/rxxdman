import './breadcrumb.css';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { useGetRecipeByIdQuery } from '~/api/query/recipeQuery';
import { Category } from '~/api/types/category';
import { pagesApp } from '~/data/pages';
import { selectRecipeId } from '~/store/slice/recipe-slice';

export const BreadcrumbNav: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);

    const { data: categories } = useGetCategoriesQuery();

    const recipeId = useSelector(selectRecipeId);

    const { data: recipe, status } = useGetRecipeByIdQuery(recipeId || '', {
        skip: !recipeId,
    });

    const breadcrumbOnClick = (index: number, categor: Category) => {
        index != pathnames.length - 1 &&
            navigate(
                `/${[...pathnames]
                    .slice(0, index + 1)
                    .map((path) =>
                        categor && categor.subCategories
                            ? `${categor.category}/${categor.subCategories[0].category}`
                            : path,
                    )
                    .join('/')}`,
            );
    };

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

            {pathnames.map((path, index) => {
                const page = pagesApp.find((page) => page.path === `/${path}`);
                const categor = categories?.find(
                    (categor) => categor.category === path && categor.subCategories,
                );
                const subcategor = categories?.find(
                    (categor) => categor.category === path && categor.rootCategoryId,
                );

                return (
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            whiteSpace='nowrap'
                            className='breadctrumpNav__link'
                            onClick={() => breadcrumbOnClick(index, categor as Category)}
                        >
                            {page?.title ||
                                categor?.title ||
                                subcategor?.title ||
                                (status !== 'pending' && recipe?.title)}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};
