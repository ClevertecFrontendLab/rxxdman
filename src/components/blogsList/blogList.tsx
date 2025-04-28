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
                            w={{ base: '100%', md: 'calc(100% / 3)' }}
                            key={blog.id}
                            overflow='hidden'
                            _hover={{
                                boxShadow:
                                    '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                            }}
                        >
                            <BlogCard blog={blog} />
                        </ListItem>
                    ))}
            </Flex>
        </UnorderedList>
    );
};
