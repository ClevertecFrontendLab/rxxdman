import 'swiper/swiper-bundle.css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { recipeListMock } from '~/data/recipes';

import { SliderRecipeCard } from './sliderRecipeCard';

interface ISliderRecipeProps {
    title?: string;
}

export const SliderRecipe: React.FC<ISliderRecipeProps> = ({ title }) => {
    const swiperRef = useRef<SwiperRef | null>(null);

    const countCard = 10; //Количество карточек

    const sortCards = [...recipeListMock].sort(function (a, b) {
        if (Date.parse(a.date) > Date.parse(b.date)) {
            return -1;
        }
        if (Date.parse(a.date) < Date.parse(b.date)) {
            return 1;
        }
        return 0;
    });

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
            <Box pos='relative' zIndex='0'>
                <Swiper
                    data-test-id='carousel'
                    slidesPerView='auto'
                    spaceBetween={12}
                    modules={[Navigation]}
                    ref={swiperRef}
                    loop={true}
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
                    {sortCards.slice(0, countCard).map((recipe, index) => (
                        <SwiperSlide key={recipe.id} style={{ width: cardSize, height: 'auto' }}>
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
        </Box>
    );
};
