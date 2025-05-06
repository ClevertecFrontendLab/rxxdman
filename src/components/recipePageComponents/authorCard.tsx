import { Avatar, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { author } from '~/API/recipeApi';
import { SubsctibeIco, UsersCount } from '~/assets/createSvg';

import { ProfileNotificationAtribute } from '../profileNotification/profileNotificationAtribute/profileNotificationAtribute';

interface IAuthorCardProps {
    author: author;
}

export const AuthorCard: FC<IAuthorCardProps> = ({ author }) => (
    <Flex
        bg='rgba(196, 255, 97, 1)'
        p={{ base: '12px', md: '24px' }}
        borderRadius='8px'
        gap={{ base: '8px', md: '16px' }}
        align='flex-end'
    >
        <Avatar
            bg='gray.400'
            size='xl'
            name={author ? author.firstName + ' ' + author.lastName : 'Сергей Разумов'}
            src={author ? author.login : 'Serge25'}
        />

        <Flex w='100%' direction='column' gap='16px'>
            {' '}
            {/* card-container */}
            <Flex justify='space-between' w='100%' position='relative'>
                {' '}
                {/* header */}
                <Flex direction='column' align='flex-start' gap={{ base: '0', md: '4px' }}>
                    <Heading
                        fontWeight={{ base: '600', md: '700' }}
                        fontSize={{ base: '18px', md: '24px' }}
                        lineHeight={{ base: '28px', md: '32px' }}
                    >
                        {author ? author.firstName + ' ' + author.lastName : 'Сергей Разумов'}
                    </Heading>
                    <Text fontWeight='400' fontSize='14px' lineHeight='20px' color='blackAlpha.700'>
                        @{author ? author.login : 'Serge25'}
                    </Text>
                </Flex>
                <Text
                    position={{ base: 'absolute', sm: 'static' }}
                    right='0'
                    top='-12px'
                    fontWeight='400'
                    fontSize='14px'
                    lineHeight='20px'
                    color='black'
                >
                    Автор рецепта
                </Text>
            </Flex>
            <Flex justify='space-between'>
                {' '}
                {/* footer */}
                <Button
                    fontWeight='600'
                    fontSize='12px'
                    lineHeight='16px'
                    size='xs'
                    variant='solid'
                    colorScheme='blackAlpha'
                    bg='blackAlpha.900'
                    leftIcon={<SubsctibeIco />}
                >
                    Подписаться
                </Button>
                <ProfileNotificationAtribute
                    Ico={UsersCount}
                    title={
                        author
                            ? author.subscribers
                                ? author.subscribers.length.toString()
                                : '0'
                            : '125'
                    }
                    type='Card'
                />
            </Flex>
        </Flex>
    </Flex>
);
