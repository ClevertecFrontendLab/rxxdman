import { Center, Tab, TabList, Tabs } from '@chakra-ui/react';
import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { categor } from '~/data/categor';

interface UTabMenuProps {
    tabIndex: number;
    categor: categor | undefined;
}

export const TabMenu: FC<UTabMenuProps> = ({ tabIndex, categor }) => {
    const navigation = useNavigate();
    const tabListRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const container = tabListRef.current;
        const activeTab = tabRefs.current[tabIndex];

        if (container && activeTab) {
            const scrollLeft = activeTab.offsetLeft - container.offsetLeft;

            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth',
            });
        }
    }, [tabIndex]);

    return (
        <Center mb={{ base: '22px', lg: '25px', '2xl': '23px' }} w='100%'>
            <Tabs
                w='100%'
                index={tabIndex}
                onChange={(index) => {
                    navigation(`/${categor?.link}/${categor?.subCategor[index].link}`);
                }}
            >
                <TabList
                    ref={tabListRef}
                    justifyContent={{ base: 'flex-start', lg: 'center' }}
                    flexWrap={{ base: 'nowrap', lg: 'wrap' }}
                    overflowY='visible'
                    overflowX={{ base: 'scroll', lg: 'hidden' }}
                    pb='2px'
                    position={{ base: 'relative' }}
                    left='-16px'
                    w='calc(100% + 32px)'
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {categor?.subCategor.map((tab, index) => (
                        <Tab
                            data-test-id={`tab-${tab.link}-${index}`}
                            key={index}
                            ref={(el) => (tabRefs.current[index] = el)}
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
