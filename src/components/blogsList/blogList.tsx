import { Flex, ListItem, UnorderedList } from '@chakra-ui/react';

import { BLOGS_LIMIT_HOME_PAGE } from '~/constants/blogs';
import { blogsData } from '~/mock/blogsMock';

import { BlogCard } from '../blogCard/blogCard';

export const BlogList = () => {
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
                    .slice(-BLOGS_LIMIT_HOME_PAGE)
                    .reverse()
                    .map((blog) => (
                        <ListItem
                            flexBasis={{
                                base: '100%',
                                md: `calc(100% / ${BLOGS_LIMIT_HOME_PAGE})`,
                            }}
                            w={{ base: '100%', md: `calc(100% / ${BLOGS_LIMIT_HOME_PAGE})` }}
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
