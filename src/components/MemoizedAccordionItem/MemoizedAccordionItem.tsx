import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { categor } from '~/data/categor';

import { CustomRadio } from '../customRadio/customRadio';

interface MemoizedAccordionItemProps {
    categor: categor;
    value: string;
    pathnames: string[];
}

export const MemoizedAccordionItem: FC<MemoizedAccordionItemProps> = React.memo(
    ({ categor, value, pathnames }) => {
        const navigate = useNavigate();

        return (
            <AccordionItem data-test-id={categor.link} border='none' w='100%' id={categor.title}>
                <h2
                    style={{
                        backgroundColor:
                            pathnames[pathnames.length - 2] === categor.link
                                ? 'rgba(234, 255, 199, 1)'
                                : '',
                    }}
                >
                    <AccordionButton
                        h='48px'
                        w='230px'
                        gap='12px'
                        p='12px 8px'
                        borderRadius='0'
                        border='none'
                        _hover={{ bg: 'rgba(255, 255, 211, 1)' }}
                        _focus={{
                            bg: 'rgba(255, 255, 211, 1)',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                        onClick={() => {
                            navigate(`/catalog/${categor.link}/0`);
                        }}
                    >
                        <Image src={`/src/assets/menuIco/${categor.ico}`} alt={categor.title} />

                        <Box as='span' flex='1' textAlign='left'>
                            <Text
                                fontSize='16px'
                                fontWeight='500'
                                lineHeight='24px'
                                color='black'
                                whiteSpace='nowrap'
                            >
                                {categor.shortTitle ? categor.shortTitle : categor.title}
                            </Text>
                        </Box>

                        <AccordionIcon bgSize='120px' />
                    </AccordionButton>
                </h2>

                <AccordionPanel p='0' display='flex' flexDirection='column' gap='1.5px'>
                    {categor.subCategor.map((item, index) => (
                        <CustomRadio
                            key={`${categor.link}-${index}`} // Уникальный ключ
                            id={categor.link + index}
                            value={categor.link + '/' + index}
                            checkedValue={value}
                            linkMenu={categor.link}
                            index={index}
                            text={item.title}
                        />
                    ))}
                </AccordionPanel>
            </AccordionItem>
        );
    },
);
