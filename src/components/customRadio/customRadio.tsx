import { FormLabel, Image, Radio } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CustomRadioProps {
    id: string;
    value: string;
    checkedValue: string;
    linkMenu?: string;
    index?: number;
    text?: string;
}

export const CustomRadio: FC<CustomRadioProps> = React.memo(
    ({ id, value, checkedValue, text, linkMenu, index }) => {
        const isChecked = checkedValue === value;

        return (
            <FormLabel
                m='0'
                p='6px 8px 6px 52px'
                style={{ cursor: 'pointer' }}
                _hover={{ bg: '#ffffd3;' }}
                h='34.5px'
                display='flex'
            >
                <Radio
                    key={`${linkMenu}-${index}`}
                    id={id}
                    value={value}
                    style={{ display: 'none' }}
                />

                <span
                    style={{
                        fontWeight: isChecked ? 700 : 500,
                        fontSize: '16px',
                        lineHeight: '150%',
                        transition: 'color 0.2s',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        position: 'relative',
                    }}
                >
                    <Image
                        pos='absolute'
                        left={isChecked ? '-19px' : '-12px'}
                        src={
                            isChecked
                                ? '/src/assets/menuIco/checked=true.svg'
                                : '/src/assets/menuIco/checked=false.svg'
                        }
                    />
                    {text}
                </span>
            </FormLabel>
        );
    },
);
