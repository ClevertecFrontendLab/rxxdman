import { Box, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

interface ILoaderTest {
    testId: string;
}

export const Loader: FC<ILoaderTest> = ({ testId }) => (
    <Box
        p={testId === 'loader-search-block' ? '4px' : '84px'}
        bgGradient='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.7) 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner data-test-id={testId} size={{ base: 'md', md: 'lg' }} />
    </Box>
);
