import { Link, ModalBody, ModalFooter, Text } from '@chakra-ui/react';

import { AUTH_MODAL } from '~/constants/auth/modal';

export const Container_TypeModal_ErrorRegister = () => (
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
                {AUTH_MODAL.ERROR_REGISTER_TITLE}
            </Text>

            <Text
                fontWeight='400'
                fontSize='16px'
                lineHeight='24px'
                color='blackAlpha.700'
                textAlign='center'
                whiteSpace='pre-line'
            >
                {AUTH_MODAL.ERROR_REGISTER_MESSAGE}
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
                {AUTH_MODAL.ERROR_REGISTER_FOOTER}
                <Link
                    borderBottom='1px solid rgba(0, 0, 0, 0.48)'
                    dangerouslySetInnerHTML={{ __html: AUTH_MODAL.REGISTER_SUPPORT }}
                />
            </Text>
        </ModalFooter>
    </>
);
