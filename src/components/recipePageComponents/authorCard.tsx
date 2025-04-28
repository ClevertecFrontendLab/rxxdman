import { Avatar, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { SubsctibeIco, UsersCount } from '~/assets/createSvg';
import { users } from '~/data/user';

import { ProfileNotificationAtribute } from '../profileNotification/profileNotificationAtribute/profileNotificationAtribute';

interface IAuthorCardProps {
    idRecipe: string;
}

export const AuthorCard: FC<IAuthorCardProps> = ({ idRecipe }) => {
    const author = users.find((user) =>
        user.recipes.find((userRecipesID) => userRecipesID === idRecipe),
    );

    return (
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
                name={author?.name + ' ' + author?.surname}
                src={author?.ico}
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
                            {author?.name + ' ' + author?.surname}
                        </Heading>
                        <Text
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='20px'
                            color='blackAlpha.700'
                        >
                            @{author?.mail}
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
                        title={author ? author.followers.toString() : ''}
                        type='Card'
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
