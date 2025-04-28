export type allergen = {
    title: string;
    options: string[];
};

export type allergensList = allergen[];

export const allergensListOptions: allergensList = [
    {
        title: 'Молочные продукты',
        options: ['Молоко'],
    },
    {
        title: 'Томат (помидор)',
        options: ['Томат', 'Помидор'],
    },
    {
        title: 'Цитрусовые',
        options: [
            'Лимон',
            'Лайм',
            'Апельсин',
            'Померанец',
            'Мандарин',
            'Грейпфрут',
            'Цитрон',
            'Помело',
        ],
    },
    {
        title: 'Клубника (ягоды)',
        options: ['Клубника', 'ягоды'],
    },
];
