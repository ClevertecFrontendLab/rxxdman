import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { FC } from 'react';

type FilterDrawerTag = {
    title: string;
    setRemove: React.Dispatch<React.SetStateAction<string[]>>;
    removeTitle?: string;
};

export const FilterDrawerTag: FC<FilterDrawerTag> = ({ title, setRemove, removeTitle }) => {
    const removeTag = (itemSelected: string) => {
        setRemove((prev) => prev.filter((item) => item !== itemSelected));
    };

    return (
        <Tag
            data-test-id='filter-tag'
            size='md'
            bg='rgba(234, 255, 199, 1)'
            h='24px'
            key={title}
            p='2px 8px'
            variant='outline'
            border='1px solid rgba(177, 255, 46, 1)'
        >
            <TagLabel
                fontSize='12px'
                fontWeight='500'
                lineHeight='16px'
                color='rgba(45, 177, 0, 1)'
            >
                {title}
            </TagLabel>
            <TagCloseButton
                h='20px'
                w='10px'
                color='rgba(45, 177, 0, 1)'
                border='none'
                _hover={{ border: 'none', color: 'red' }}
                onClick={(e) => {
                    e.stopPropagation();
                    removeTag(removeTitle ? removeTitle : title);
                }}
            />
        </Tag>
    );
};
