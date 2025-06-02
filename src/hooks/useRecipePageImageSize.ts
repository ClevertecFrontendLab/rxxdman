import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export const useRecipePageImageSize = () => {
    const xl2 = useBreakpointValue({
        base: false,
        '2xl': true,
    });

    const textRef = useRef<HTMLDivElement>(null);
    const [textHeight, setTextHeight] = useState(224);

    useEffect(() => {
        function updateHeight() {
            if (textRef.current) {
                const height = textRef.current.offsetHeight;
                setTextHeight(height < 224 ? 224 : height);
            }
        }

        updateHeight();

        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // }, [recipe]);

    return { xl2, textRef, textHeight };
};
