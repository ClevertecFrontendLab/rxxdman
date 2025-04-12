import { Avatar, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { users } from '~/data/user';

interface userCardProps {
    id: string;
}

export const UserCard: FC<userCardProps> = ({ id }) => {
    const user = users.find((user) => user.id === id);

    return (
        <Flex w='100%' gap={{ base: '8px', lg: '12px' }} align='center'>
            <Avatar
                bg='gray.400'
                size={{ base: 'sm', lg: 'md' }}
                name={user?.name + ' ' + user?.surname}
                src={user?.ico}
            />

            <Flex direction='column' overflow='hidden' alignItems='flex-start'>
                <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    fontWeight='500'
                    lineHeight={{ base: '24px', lg: '28px' }}
                    color='black'
                    textAlign='left'
                    w='100%'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    whiteSpace='nowrap'
                >
                    {user?.name + ' ' + user?.surname}
                </Text>

                <Text
                    fontSize={{ base: '12px', lg: '14px' }}
                    fontWeight='400'
                    lineHeight={{ base: '16px', lg: '20px' }}
                    color='blackAlpha.700'
                >
                    @{user?.mail}
                </Text>
            </Flex>
        </Flex>
    );
};
