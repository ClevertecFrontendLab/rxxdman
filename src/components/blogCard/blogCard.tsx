import { Box, Card, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { blog } from '~/data/blogs';

import { UserCard } from '../userCard/userCard';

interface IBlogCardProps {
    blog: blog;
}

export const BlogCard: FC<IBlogCardProps> = ({ blog }) => (
    <Card
        w='100%'
        direction='column'
        p={{ base: '16px 16px 20px 16px', md: '16px 17px 20px 16px', '2xl': '24px 24px 22px 24px' }}
        boxShadow='none'
        overflow='hidden'
        _hover={{
            boxShadow:
                '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
        }}
    >
        <Box mb={{ base: '16px', '2xl': '28px' }}>
            <UserCard id={blog.userId} />
        </Box>

        <Text
            w='100%'
            h='60px'
            display='-webkit-box'
            overflow='hidden'
            textOverflow='ellipsis'
            style={{
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 3,
            }}
            fontSize='14px'
            fontWeight='400'
            lineHeight='20px'
            textAlign='left'
        >
            {blog.text}
        </Text>
    </Card>
);
