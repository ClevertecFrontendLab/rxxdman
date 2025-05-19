import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { RoutesAuth } from '~/app/routes/routesAuth';

type AutnNavigationType = {
    url: string;
    title: string;
};

const autnMenu: AutnNavigationType[] = [
    {
        url: '/login',
        title: 'Вход на сайт',
    },
    {
        url: '/register',
        title: 'Регистрация',
    },
];

export const AuthNavigation = () => {
    const navigation = useNavigate();
    const path = useLocation().pathname;

    const tabIndex = path === '/register' ? 1 : 0;

    return (
        <Tabs w='100%' defaultIndex={tabIndex}>
            <TabList mb='40px' borderBottom='2px solid rgba(0, 0, 0, 0.08)' gap='16px'>
                {autnMenu.map((tab, index) => (
                    <Tab
                        fontWeight='500'
                        fontSize={{ base: '16px', lg: '18px' }}
                        lineHeight={{ base: '24px', lg: '28px' }}
                        color='rgba(19, 75, 0, 1)'
                        p={{ base: '14px 24px', lg: '12px 24px' }}
                        whiteSpace='nowrap'
                        border='none'
                        borderRadius='0'
                        _focus={{
                            outline: 'none',
                        }}
                        _selected={{
                            color: 'rgba(32, 126, 0, 1)',
                            border: 'none',
                            borderBottom: '2px solid rgba(32, 126, 0, 1)',
                        }}
                        key={index}
                        onClick={() => navigation(tab.url)}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                <RoutesAuth />
            </TabPanels>
        </Tabs>
    );
};
