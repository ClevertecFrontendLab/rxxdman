import { Accordion, RadioGroup } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { categorListData } from '~/data/categor';

import { MemoizedAccordionItem } from '../MemoizedAccordionItem/MemoizedAccordionItem';

export const MenuList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);
    const [value, setValue] = React.useState('');
    const [index, setIndex] = React.useState(-1);

    const categor = categorListData.find((categor) => categor.link === pathnames[1]);

    useEffect(() => {
        if (pathnames.length > 1) {
            const newValue = `${pathnames[1]}/${pathnames[2]}`;
            setValue(newValue);
            setIndex(Number(categor?.id));
        } else {
            setValue('');
            setIndex(-1);
        }
    }, [pathnames]);

    const handleChange = (newValue: string) => {
        navigate(`/catalog/${newValue}`);
    };

    return (
        <RadioGroup
            maxH='872px'
            overflowY='scroll'
            overflowX='hidden'
            onChange={handleChange}
            value={value}
        >
            <Accordion index={[index]} w='100%' p='10px 0 10px 9px'>
                {categorListData.map((categor) => (
                    <MemoizedAccordionItem
                        key={categor.title}
                        categor={categor}
                        value={value}
                        pathnames={pathnames}
                    />
                ))}
            </Accordion>
        </RadioGroup>
    );
};
