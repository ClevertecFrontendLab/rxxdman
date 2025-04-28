import { Image, Tag, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { categorListData } from '~/data/categor';

interface IRecipeCardTagProps {
    categorLink: string;
    color: string;
}

export const RecipeCardTag: FC<IRecipeCardTagProps> = ({ categorLink, color }) => {
    const categor = categorListData.find((categor) => categor.link === categorLink);

    return (
        <Tag p={{ base: '2px 4px', lg: '2px 8px' }} bg={color} gap={{ base: '2px', lg: '8px' }}>
            <Image
                h='16px'
                w='16px'
                src={`/src/assets/menuIco/${categor?.ico}`}
                alt={categor?.tag}
            />
            <Text
                fontSize='14'
                fontWeight='400'
                lineHeight='20px'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
            >
                {categor?.tag}
            </Text>
        </Tag>
    );
};
