import { Link, ModalBody, ModalFooter, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';

import { AUTH_MODAL } from '~/constants/auth/modal';

type PropsContainerTypeModal_SuccessRegistor = {
    mail: string;
};

export const Container_TypeModal_SuccessRegistor: FC<PropsContainerTypeModal_SuccessRegistor> = ({
    mail,
}) => {
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });

    return (
        <>
            <ModalBody p={0} w='100%'>
                <Text
                    fontWeight='700'
                    fontSize='24px'
                    lineHeight='32px'
                    color='black'
                    textAlign='center'
                    whiteSpace='pre-line'
                    mb='16px'
                >
                    {isMobileVersion
                        ? AUTH_MODAL.SUCCESS_REGISTER_TITLE_MOBILE
                        : AUTH_MODAL.SUCCESS_REGISTER_TITLE}
                </Text>

                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='24px'
                    color='blackAlpha.700'
                    textAlign='center'
                    whiteSpace='pre-line'
                >
                    {AUTH_MODAL.SUCCESS_REGISTER_MESSAGE.split('(MAIL)')[0]}
                    <br />
                    <span style={{ fontWeight: '600', color: 'rgba(0, 0, 0, 0.92)' }}>{mail}</span>
                    <br />
                    {AUTH_MODAL.SUCCESS_REGISTER_MESSAGE.split('(MAIL)')[1]}
                </Text>
            </ModalBody>

            <ModalFooter w='100%' mt={8} p={0} justifyContent='center'>
                <Text
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='16px'
                    color='blackAlpha.600'
                    textAlign='center'
                    whiteSpace='pre-line'
                >
                    {isMobileVersion
                        ? AUTH_MODAL.SUCCESS_REGISTER_FOOTER_MOBILE
                        : AUTH_MODAL.SUCCESS_REGISTER_FOOTER}
                    <Link
                        borderBottom='1px solid rgba(0, 0, 0, 0.48)'
                        dangerouslySetInnerHTML={{ __html: AUTH_MODAL.REGISTER_SUPPORT }}
                    />
                </Text>
            </ModalFooter>
        </>
    );
};
