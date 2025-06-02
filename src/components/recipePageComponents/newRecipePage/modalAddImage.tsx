import {
    Button,
    Center,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

import { useImageUploadMutation } from '~/api/query/recipeQuery';
import { Loader } from '~/components/loader/loader';
import { BUTTONS } from '~/constants/recipes';

type props = {
    onClose(): void;
    isOpen: boolean;
    setValue: UseFormSetValue<FieldValues>;
    imagePath: string;
};

export const ModalAddImage: FC<props> = ({ onClose, isOpen, imagePath, setValue }) => {
    const [imageUploadMutation, { data, isSuccess, status }] = useImageUploadMutation();

    const [localImage, setLocalImage] = useState<string>(imagePath);
    const [fileImage, setFileImage] = useState<File>();

    const closeModal = () => {
        setLocalImage(imagePath);
        onClose();
    };

    const handleImageClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = () => {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                setFileImage(file);
                const reader = new FileReader();

                reader.onloadend = () => {
                    if (reader.result && typeof reader.result === 'string') {
                        setLocalImage(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const uploadFile = async () => {
        if (fileImage) {
            await imageUploadMutation(fileImage);
        }
    };

    useEffect(() => {
        if (isSuccess && data?.url) {
            setValue('mainImageRecipe', data.url);
            onClose();
        }
    }, [isSuccess, data, setValue, onClose]);

    return (
        <>
            {status === 'pending' && (
                <Center
                    zIndex={10001}
                    bg='rgba(0, 0, 0, 0.16)'
                    position='fixed'
                    left={0}
                    top={0}
                    h='100vh'
                    w='100vw'
                    backdropFilter='blur(1px)'
                >
                    <Loader testId='app-loader' />
                </Center>
            )}
            <Modal isCentered isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent w='396px' p='32px' gap='32px' alignItems='center' borderRadius='16px'>
                    <ModalHeader
                        p={0}
                        fontSize='24px'
                        lineHeight='32px'
                        fontWeight='700'
                        textAlign='center'
                    >
                        Изображение
                    </ModalHeader>
                    <ModalCloseButton
                        top='24px'
                        right='24px'
                        h='24px'
                        w='24px'
                        size='md'
                        borderRadius={999}
                        outline='1px solid black'
                    />

                    <ModalBody p={0} h='206px' w='206px' overflow='hidden'>
                        <Image
                            h='100%'
                            w='100%'
                            transform={
                                localImage === '/src/assets/no-image.png' ? 'scale(2)' : 'scale(1)'
                            }
                            src={localImage}
                            cursor='pointer'
                            onClick={handleImageClick}
                        />
                    </ModalBody>

                    {imagePath === '/src/assets/no-image.png' &&
                        localImage != '/src/assets/no-image.png' && (
                            <ModalFooter p={0} w='100%'>
                                <Button
                                    onClick={() => uploadFile()}
                                    size='lg'
                                    variant='solid'
                                    colorScheme='black'
                                    bgColor='black'
                                    w='100%'
                                    fontSize='18px'
                                    lineHeight='28px'
                                    fontWeight='600'
                                >
                                    {BUTTONS.SAVE_IMAGE}
                                </Button>
                            </ModalFooter>
                        )}

                    {imagePath != '/src/assets/no-image.png' &&
                        localImage != '/src/assets/no-image.png' && (
                            <ModalFooter p={0} w='100%'>
                                <Button
                                    onClick={() => uploadFile()}
                                    size='lg'
                                    variant='solid'
                                    colorScheme='black'
                                    bgColor='black'
                                    w='100%'
                                    fontSize='18px'
                                    lineHeight='28px'
                                    fontWeight='600'
                                >
                                    {BUTTONS.SAVE_IMAGE}
                                </Button>
                            </ModalFooter>
                        )}
                </ModalContent>
            </Modal>
        </>
    );
};
