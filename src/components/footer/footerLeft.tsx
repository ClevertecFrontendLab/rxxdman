import { Button, createIcon, Flex, Text } from '@chakra-ui/react';

export const Footerleft = () => {
    const FooterBtnIcoLeave = createIcon({
        displayName: 'footerBtnIcoLeave',
        viewBox: '0 0 12 12',
        path: [
            <path fill='black' d='M8 6.5V5.5H3.5V4L1 6L3.5 8V6.5H8Z' />,
            <path
                fill='black'
                d='M10 1.5H5.5C4.9485 1.5 4.5 1.9485 4.5 2.5V4.5H5.5V2.5H10V9.5H5.5V7.5H4.5V9.5C4.5 10.0515 4.9485 10.5 5.5 10.5H10C10.5515 10.5 11 10.0515 11 9.5V2.5C11 1.9485 10.5515 1.5 10 1.5Z'
            />,
        ],
    });

    return (
        <Flex
            direction='column'
            align='flex-start'
            textAlign='left'
            justify='flex-start'
            gap='16px'
            p='0 24px 32px 24px'
            maxH='144px'
        >
            <Text
                fontWeight='500'
                fontSize='12px'
                lineHeight='16px'
                color='rgba(0, 0, 0, 0.24)'
                w='100%'
            >
                Версия программы 03.25
            </Text>

            <Text
                fontWeight='400'
                fontSize='12px'
                lineHeight='16px'
                color='rgba(0, 0, 0, 0.64)'
                w='100%'
            >
                Все права защищены,
                <br /> ученический файл, <br />
                &copy;Клевер Технолоджи, 2025
            </Text>

            <Button
                p='0'
                w='100%'
                fontWeight='400'
                fontSize='12px'
                lineHeight='16px'
                justifyContent='flex-start'
                color='rgba(0, 0, 0, 0.64)'
                colorScheme='gray'
                variant='link'
                border='none'
                leftIcon={<FooterBtnIcoLeave />}
                _hover={{
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
                _focus={{
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
                _active={{
                    outline: 'none',
                    border: 'none',
                    boxShadow: 'none',
                }}
            >
                Выйти
            </Button>
        </Flex>
    );
};
