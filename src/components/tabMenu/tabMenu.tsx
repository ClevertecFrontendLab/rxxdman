import { Center, Tab, TabList, Tabs } from '@chakra-ui/react';
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
        <Center mb={{ base: '22px', lg: '25px', '2xl': '23px' }} w='100%'>
            <Tabs
                w='100%'
                overflow={{ base: 'scroll', lg: 'hidden' }}
                index={tabIndex}
                onChange={(index) => {
                    navigation(`/catalog/${categor?.link}/${index}`);
                }}
            >
                <TabList justifyContent='center'>
                    {categor?.subCategor.map((tab, index) => (
                        <Tab
                            key={index}
                            fontWeight='500'
                            fontSize={{ base: '14px', lg: '16px' }}
                            lineHeight={{ base: '20px', lg: '24px' }}
                            color='rgba(19, 75, 0, 1)'
                            whiteSpace='nowrap'
                            border='none'
                            borderRadius='0'
                            _focus={{
                                outline: 'none',
                            }}
                            _selected={{
                                color: 'rgba(45, 177, 0, 1)',
                                border: 'none',
                                borderBottom: '2px solid rgba(45, 177, 0, 1)',
                            }}
                        >
                            {tab.title}
                        </Tab>
                    ))}
                </TabList>
            </Tabs>
        </Center>
    );
};
