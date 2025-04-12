export type blog = {
    id: string;
    userId: string;
    text: string;
    date: Date;
};

export type blogsList = blog[];

export const blogsData: blogsList = [
    {
        id: '0',
        userId: '2',
        text: 'Это старый блог',
        date: new Date(2025, 4, 7, 11, 0, 0),
    },
    {
        id: '1',
        userId: '0',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        date: new Date(2025, 4, 7, 12, 0, 0),
    },
    {
        id: '2',
        userId: '2',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        date: new Date(2025, 4, 7, 13, 0, 0),
    },
    {
        id: '3',
        userId: '1',
        text: 'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        date: new Date(2025, 4, 7, 14, 0, 0),
    },
];
