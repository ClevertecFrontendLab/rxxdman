import { Flex, ListItem, UnorderedList } from '@chakra-ui/react';

import { blogsData } from '~/data/blogs';

import { BlogCard } from '../blogCard/blogCard';

export const BlogList = () => {
    const count = 3;

    const list = [...blogsData];

    return (
        <UnorderedList w='100%' m='0' styleType='none'>
            <Flex
                w='100%'
                gap={{ base: '12px', lg: '16px' }}
                wrap={{ base: 'wrap', md: 'nowrap' }}
                justify='space-between'
            >
                {list
                    .slice(-count)
                    .reverse()
                    .map((blog) => (
                        <ListItem
                            flexBasis={{ base: '100%', md: 'calc(100% / 3)' }}
                            maxW='100%'
                            key={blog.id}
                        >
                            <BlogCard blog={blog} />
                        </ListItem>
                    ))}
            </Flex>
        </UnorderedList>
    );
};
