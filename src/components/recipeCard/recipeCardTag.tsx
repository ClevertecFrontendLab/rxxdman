import { Image, Tag, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { useGetCategoriesQuery } from '~/API/categorsApi';

interface IRecipeCardTagProps {
    subCategorId: string;
    color: string;
}

export const RecipeCardTag: FC<IRecipeCardTagProps> = ({ subCategorId, color }) => {
    const { data: categories } = useGetCategoriesQuery();

    const categor = categories?.find((categor) =>
        categor.subCategories?.find((subcategorLocal) => subcategorLocal._id === subCategorId),
    );

    return (
        <Tag p={{ base: '2px 4px', lg: '2px 8px' }} bg={color} gap={{ base: '2px', lg: '8px' }}>
            <Image
                h='16px'
                w='16px'
                src={`https://training-api.clevertec.ru/${categor?.icon}`}
                alt={categor?.title}
            />
            <Text
                fontSize='14'
                fontWeight='400'
                lineHeight='20px'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
            >
                {categor?.title}
            </Text>
        </Tag>
    );
};
