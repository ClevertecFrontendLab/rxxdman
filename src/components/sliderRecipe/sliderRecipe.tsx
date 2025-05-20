import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Center, Heading, IconButton, Text, useBreakpointValue } from '@chakra-ui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { Recipe } from '~/api/types/recipe';
import { RecipeResponse } from '~/api/types/responce';

import { SliderRecipeCard } from './sliderRecipeCard';

type SliderRecipeProps = {
    title?: string;
    error: FetchBaseQueryError | SerializedError | undefined;
    sliderList: RecipeResponse | undefined;
};

export const SliderRecipe: React.FC<SliderRecipeProps> = ({ title, error, sliderList }) => {
    const [array, setArray] = useState<Recipe[]>([]);

    useEffect(() => {
        if (sliderList) {
            const recipeListTest =
                sliderList.data && Array.isArray(sliderList.data) ? [...sliderList.data] : [];
            setArray(recipeListTest);
        }
    }, [sliderList, sliderList?.data]);

    const swiperRef = useRef<SwiperRef | null>(null);

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const checkSizeBtn = useBreakpointValue({
        base: true,
        '2xl': false,
    });

    const cardSize = useBreakpointValue({
        base: '158px',
        lg: '277px',
        '2xl': '322px',
    });

    return (
        <Box as='section'>
            {title && (
                <Heading
                    as='h2'
                    textAlign='left'
                    fontWeight='500'
                    fontSize={{ base: '24px', lg: '36px', '2xl': '48px' }}
                    lineHeight={{ base: '32px', lg: '40px', '2xl': '48px' }}
                    letterSpacing='1px'
                    mb={{ base: '13px', xl: '27px' }}
                >
                    {title}
                </Heading>
            )}
            {!error ? (
                <Box pos='relative' zIndex='0'>
                    <Swiper
                        data-test-id='carousel'
                        slidesPerView='auto'
                        spaceBetween={12}
                        modules={[Navigation]}
                        ref={swiperRef}
                        loop={array.length >= 1}
                        breakpoints={{
                            300: {
                                spaceBetween: '12px',
                            },
                            768: {
                                spaceBetween: '16px',
                            },
                            1360: {
                                spaceBetween: '24px',
                            },
                            1600: {
                                spaceBetween: '24px',
                            },
                        }}
                    >
                        {array.map((recipe, index) => (
                            <SwiperSlide
                                key={recipe._id}
                                style={{ width: cardSize, height: 'auto' }}
                            >
                                <SliderRecipeCard recipe={recipe} index={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <IconButton
                        data-test-id='carousel-back'
                        display={{ base: 'none', lg: 'flex' }}
                        position='absolute'
                        top='147px'
                        left='-8px'
                        onClick={handlePrevSlide}
                        size={checkSizeBtn ? 'md' : 'lg'}
                        colorScheme='black'
                        variant='solid'
                        bg='rgba(0, 0, 0, 1)'
                        color='white'
                        aria-label='left slider'
                        icon={<ArrowBackIcon boxSize={{ base: 4, '2xl': 6 }} />}
                        transition='background .2s ease-in-out'
                        _hover={{ bg: 'rgba(0, 0, 0, .7)', border: 'none' }}
                        zIndex='10'
                    />

                    <IconButton
                        data-test-id='carousel-forward'
                        display={{ base: 'none', lg: 'flex' }}
                        position='absolute'
                        top='147px'
                        right='-8px'
                        onClick={handleNextSlide}
                        size={checkSizeBtn ? 'md' : 'lg'}
                        colorScheme='black'
                        variant='solid'
                        bg='rgba(0, 0, 0, 1)'
                        color='white'
                        aria-label='right slider'
                        icon={<ArrowForwardIcon boxSize={6} />}
                        transition='background .2s ease-in-out'
                        _hover={{ bg: 'rgba(0, 0, 0, .7)', border: 'none' }}
                        zIndex='10'
                    />
                </Box>
            ) : (
                <Center>
                    <Text>
                        Не удалось получить рецепты :с <br />
                        Попробуйте попозже
                    </Text>
                </Center>
            )}
        </Box>
    );
};
