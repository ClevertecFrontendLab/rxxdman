import { Flex } from '@chakra-ui/react';

import {
    ProfileNotificationAtributeLike,
    ProfileNotificationAtributeSave,
    ProfileNotificationAtributeUsers,
} from '~/assets/createSvg';

import { ProfileNotificationAtribute } from '../profileNotificationAtribute/profileNotificationAtribute';

export const ProfileNotification = () => (
    <Flex
        direction={{ base: 'row', lg: 'column' }}
        gap={{ base: '0', lg: '24px' }}
        p={{ base: '0 8px', sm: '0 16px', lg: '16px 56px 16px 65px' }}
    >
        <ProfileNotificationAtribute key='1' Ico={ProfileNotificationAtributeSave} title='185' />

        <ProfileNotificationAtribute key='2' Ico={ProfileNotificationAtributeUsers} title='589' />

        <ProfileNotificationAtribute key='3' Ico={ProfileNotificationAtributeLike} title='587' />
    </Flex>
);
