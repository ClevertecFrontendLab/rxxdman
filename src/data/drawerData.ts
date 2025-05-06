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

export type searchType = {
    titleRu: string;
    titleEn: string;
};

export const meatsList: searchType[] = [
    {
        titleRu: 'Курица',
        titleEn: 'сhicken',
    },
    {
        titleRu: 'Свинина',
        titleEn: 'pork',
    },
    {
        titleRu: 'Говядина',
        titleEn: 'beef',
    },
    {
        titleRu: 'Индейка',
        titleEn: 'turkey',
    },
    {
        titleRu: 'Утка',
        titleEn: 'duck',
    },
];

export const garnishList: searchType[] = [
    {
        titleRu: 'Картошка',
        titleEn: 'potatoes',
    },
    {
        titleRu: 'Гречка',
        titleEn: 'buckwheat',
    },
    {
        titleRu: 'Паста',
        titleEn: 'pasta',
    },
    {
        titleRu: 'Спаггети',
        titleEn: 'spaghetti',
    },
    {
        titleRu: 'Рис',
        titleEn: 'rice',
    },
    {
        titleRu: 'Капуста',
        titleEn: 'cabbage',
    },
    {
        titleRu: 'Фасоль',
        titleEn: 'beans',
    },
    {
        titleRu: 'Другие овощи',
        titleEn: 'other',
    },
];
