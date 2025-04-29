import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys,
);

const limeCheckbox = definePartsStyle({
    label: {
        color: 'gray.800',
    },
    control: {
        border: '2px solid',
        borderColor: 'rgba(215, 255, 148, 1)',
        borderRadius: 'sm',
        _checked: {
            background: 'rgba(177, 255, 46, 1)',
            borderColor: 'rgba(177, 255, 46, 1)',
            _hover: {
                background: 'rgba(177, 255, 46, 1)',
                borderColor: 'rgba(177, 255, 46, 1)',
            },
        },
    },
    icon: {
        color: 'black',
    },
});

export const checkboxTheme = defineMultiStyleConfig({
    variants: {
        limeCheckbox: limeCheckbox,
    },
});
