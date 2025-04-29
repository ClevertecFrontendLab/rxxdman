import { Flex } from '@chakra-ui/react';

import { LikesCount, SaveCount, UsersCount } from '~/assets/createSvg';

import { ProfileNotificationAtribute } from './profileNotificationAtribute/profileNotificationAtribute';

export const ProfileNotification = () => (
    <Flex
        direction={{ base: 'row', lg: 'column' }}
        gap={{ base: '0', lg: '24px' }}
        p={{ base: '0 8px', sm: '0 16px', lg: '16px 0 16px 0', xl: '16px 27px 16px 66px' }}
    >
        <ProfileNotificationAtribute key='profileNotification-like' Ico={LikesCount} title='185' />

        <ProfileNotificationAtribute key='profileNotification-save' Ico={SaveCount} title='589' />

        <ProfileNotificationAtribute key='profileNotification-users' Ico={UsersCount} title='587' />
    </Flex>
);
