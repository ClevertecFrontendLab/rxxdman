import { ComponentWithAs, HStack, IconProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

type TypeAtributeNotification = 'Notification' | 'Card';

interface profileNotificationAtributeProps {
    Ico: ComponentWithAs<'svg', IconProps>;
    title: string;
    type?: TypeAtributeNotification;
}

export const ProfileNotificationAtribute: FC<profileNotificationAtributeProps> = ({
    Ico,
    title,
    type = 'Notification',
}) => (
    <HStack
        spacing={type === 'Notification' ? '8px' : '5px'}
        p={{
            base: type === 'Notification' ? '4px 8px' : '4px',
            lg: type === 'Notification' ? '8px 16px' : '4px',
        }}
    >
        <Ico
            w='16px'
            h='16px'
            boxSize={{ base: '12px', lg: type === 'Notification' ? '16px' : '12px' }}
        />
        <Text
            color='rgba(45, 177, 0, 1)'
            fontWeight='600'
            fontSize={{ base: '12px', lg: type === 'Notification' ? '16px' : '12px' }}
            lineHeight={{ base: '16px', lg: type === 'Notification' ? '24px' : '16px' }}
        >
            {title}
        </Text>
    </HStack>
);
