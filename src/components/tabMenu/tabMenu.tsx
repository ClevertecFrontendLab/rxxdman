import { Tab, TabList, Tabs } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { categor } from '~/data/categor';

interface UTabMenuProps {
    tabIndex: number;
    categor: categor | undefined;
}

export const TabMenu: FC<UTabMenuProps> = ({ tabIndex, categor }) => {
    const navigation = useNavigate();

    return (
        <Tabs
            index={tabIndex}
            onChange={(index) => {
                navigation(`/catalog/${categor?.link}/${index}`);
            }}
        >
            <TabList>
                {categor?.subCategor.map((tab, index) => (
                    <Tab
                        key={index}
                        fontWeight='500'
                        fontSize={{ base: '14px', lg: '16px' }}
                        lineHeight={{ base: '20px', lg: '24px' }}
                        color='rgba(19, 75, 0, 1)'
                        whiteSpace='nowrap'
                        border='none'
                        _focus={{
                            outline: 'none',
                        }}
                        _selected={{
                            color: 'rgba(45, 177, 0, 1)',
                            border: 'none',
                        }}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </TabList>
        </Tabs>
    );
};
