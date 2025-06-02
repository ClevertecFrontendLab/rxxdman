import { Image, ImageProps } from '@chakra-ui/react';
import { FC } from 'react';

import { IMAGE_API_URL } from '~/api/constants/apiConstant';

type PropsRecipePage = ImageProps & {
    imageUrl?: string;
    textHeight: number;
};

export const RecipeImage: FC<PropsRecipePage> = ({ imageUrl, textHeight, ...restProps }) => (
    <Image
        src={imageUrl ? `${IMAGE_API_URL}${imageUrl}` : '/src/assets/no-image.png'}
        borderRadius='8px'
        objectFit='cover'
        w={{
            base: '100%',
            md: '232px',
            lg: 'calc(100% - 503px)',
            '2xl': 'calc(100% - 783px)',
        }}
        maxW={{ base: '100%', md: '232px', lg: '353px', '2xl': '553px' }}
        h={{ base: '224px', md: imageUrl ? `${textHeight}px` : '224px', lg: `${textHeight}px` }}
        flexShrink={0}
        {...restProps}
    />
);
