export type ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};

export type ingredientsList = ingredient[];

export type stepRecipe = {
    stepNumber: number;
    description: string;
    image?: string;
};

export type stepsList = stepRecipe[];

export type nutritionValue = {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
};

export type recipe = {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    portions: number;
    nutritionValue: nutritionValue;
    ingredients: ingredientsList;
    steps: stepsList;
    meat?: string;
    side?: string;
};

export type recipeList = recipe[];

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

export const recipeListMock: recipeList = [
    {
        id: '0',
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, - вариант сытного блюда на каждый день. Фасоль в данном случае заменяет мясо, делая рагу сытным и питательным. Чтобы сократить время приготовления, возьмём консервированную фасоль. Блюдо хоть и простое, но в полной мере наполнено ароматами и имеет выразительный вкус за счёт добавления томатной пасты.',
        category: ['vegan', 'second-dish'],
        subcategory: ['snacks', 'vegetables'],
        image: '/src/assets/recipes/0.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-02-28T00:00:00Z',
        time: '40 минут',
        portions: 2,
        nutritionValue: { calories: 250, proteins: 5, fats: 8, carbohydrates: 40 },
        ingredients: [
            { title: 'картошка', count: '4', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '2', measureUnit: 'шт.' },
            { title: 'фасоль', count: '200', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать картошку и перец.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Обжарить лук до золотистого цвета.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Добавить картошку, перец и фасоль, залить соусом.',
                image: 'url',
            },
            {
                stepNumber: 4,
                description: 'Тушить на медленном огне 30 минут.',
                image: 'url',
            },
        ],
        meat: '',
        side: 'potatoes',
    },
    {
        id: '1',
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов. Готовится это блюдо без яиц, без мяса и без сыра, из самых простых ингредиентов, а получается очень вкусно и сытно. Постный рецепт картофельных рулетиков с грибами, в томатном соусе, - на обед, ужин и даже на праздничный стол!',
        category: ['vegan', 'snacks'],
        subcategory: ['snacks', 'warm-snacks'],
        image: '/src/assets/recipes/1.jpg',
        bookmarks: 85,
        likes: 1152,
        date: '2024-02-20T00:00:00Z',
        time: '30 минут',
        portions: 2,
        nutritionValue: { calories: 180, proteins: 4, fats: 6, carbohydrates: 28 },
        ingredients: [
            { title: 'картошка', count: '3', measureUnit: 'шт.' },
            { title: 'грибы', count: '200', measureUnit: 'г' },
            { title: 'мука', count: '100', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Отварить картошку и сделать пюре.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Обжарить грибы до готовности.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Сформировать рулетики и обжарить.',
                image: 'url',
            },
        ],
        side: 'potatoes',
    },
    {
        id: '2',
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья готовится с овощным соусом и соусом бешамель, а вместо листов для лазаньи используется тонкий лаваш.',
        category: ['vegan', 'second-dish', 'national'],
        subcategory: ['second-dish', 'vegetables', 'italian', 'snacks'],
        image: '/src/assets/recipes/2.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2023-01-25T00:00:00Z',
        time: '1 час',
        portions: 1,
        nutritionValue: { calories: 300, proteins: 12, fats: 8, carbohydrates: 45 },
        ingredients: [
            { title: 'лаваш', count: '3', measureUnit: 'листов' },
            { title: 'овощной соус', count: '300', measureUnit: 'мл' },
            { title: 'соус бешамель', count: '200', measureUnit: 'мл' },
            { title: 'сыр', count: '100', measureUnit: 'г' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Приготовить соусы.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Сложить слои лазаньи.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Запекать 30 минут.',
                image: 'url',
            },
        ],
    },
    {
        id: '3',
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благодаря использованию томатного соуса и душистых пряностей.',
        category: ['vegan', 'second-dish'],
        subcategory: ['second-dish', 'poultry-dish'],
        image: '/src/assets/recipes/3.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2023-02-15T00:00:00Z',
        time: '50 минут',
        portions: 4,
        nutritionValue: { calories: 200, proteins: 10, fats: 5, carbohydrates: 30 },
        ingredients: [
            { title: 'булгур', count: '150', measureUnit: 'г' },
            { title: 'чечевица', count: '100', measureUnit: 'г' },
            { title: 'томатный соус', count: '200', measureUnit: 'мл' },
            { title: 'лук', count: '1', measureUnit: 'шт.' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Смешать булгур и чечевицу.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Сформировать тефтели и запечь.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Подавать с соусом.',
                image: 'url',
            },
        ],
    },
    {
        id: '4',
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке - просто объедение! Отличная идея для обеда или ужина, готовится просто!',
        category: ['vegan', 'second-dish'],
        subcategory: ['side-dishes', 'second-dish', 'vegetables'],
        image: '/src/assets/recipes/4.jpg',
        bookmarks: 124,
        likes: 342,
        date: '2024-03-01T00:00:00Z',
        time: '30 минут',
        portions: 2,
        nutritionValue: { calories: 220, proteins: 4, fats: 7, carbohydrates: 35 },
        ingredients: [
            { title: 'картошка', count: '6', measureUnit: 'шт.' },
            { title: 'чеснок', count: '5', measureUnit: 'зубчиков' },
            { title: 'масло', count: '50', measureUnit: 'мл' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Очистить и нарезать картошку.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Обжарить с чесноком.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Подавать горячей.',
                image: 'url',
            },
        ],
        side: 'potatoes',
    },
    {
        id: '5',
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и невероятно вкусными. Мягкий вкус и лёгкая пряная нотка наверняка помогут сделать эти чудесные котлеты из капусты одним из ваших любимых овощных блюд.',
        category: ['vegan'],
        subcategory: ['second-dish', 'snacks'],
        image: '/src/assets/recipes/5.jpg',
        bookmarks: 2,
        likes: 1,
        date: '2024-02-05T00:00:00Z',
        time: '35 минут',
        portions: 4,
        nutritionValue: { calories: 150, proteins: 5, fats: 4, carbohydrates: 20 },
        ingredients: [
            { title: 'капуста', count: '300', measureUnit: 'г' },
            { title: 'мука', count: '50', measureUnit: 'г' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать капусту и отварить.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Смешать с мукой и сформировать котлеты.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Обжарить до золотистой корочки.',
                image: 'url',
            },
        ],
    },
    {
        id: '6',
        title: 'Овощное рагу',
        description: 'Сытное рагу из сезонных овощей, приправленное травами.',
        category: ['vegan', 'second-dish'],
        subcategory: ['side-dishes', 'vegetables', 'snacks'],
        image: '/src/assets/recipes/6.jpg',
        bookmarks: 8,
        likes: 60,
        date: '2023-03-12T00:00:00Z',
        time: '1 час',
        portions: 2,
        nutritionValue: { calories: 200, proteins: 5, fats: 8, carbohydrates: 30 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'морковь', count: '1', measureUnit: 'шт.' },
            { title: 'картошка', count: '2', measureUnit: 'шт.' },
            { title: 'специи', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Нарезать все овощи.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Обжарить на сковороде.',
                image: 'url',
            },
            {
                stepNumber: 3,
                description: 'Добавить специи и тушить до готовности.',
                image: 'url',
            },
        ],
    },
    {
        id: '7',
        title: 'Лапша с курицей и шафраном',
        description: 'Ароматная лапша с курицей и шафраном, идеальное сочетание для сытного обеда.',
        category: ['second-dish'],
        subcategory: ['poultry-dish'],
        image: '/src/assets/recipes/7.jpg',
        bookmarks: 258,
        likes: 1342,
        date: '2024-03-08T00:00:00Z',
        time: '20 минут',
        portions: 4,
        nutritionValue: { calories: 358, proteins: 23, fats: 20, carbohydrates: 54 },
        ingredients: [
            { title: 'Спаггети', count: '200', measureUnit: 'г.' },
            { title: 'Куринное филе', count: '300', measureUnit: 'г.' },
            { title: 'Зелёный лук', count: '1', measureUnit: 'пучок' },
            { title: 'Репчатый лук', count: '1', measureUnit: 'шт.' },
            { title: 'Чеснок', count: '1', measureUnit: 'зубчик' },
            { title: 'Масло или жир', count: '40', measureUnit: 'г.' },

            { title: 'Молотый шафран', count: '1', measureUnit: 'щепотка' },
            { title: 'Молотая корица', count: '1', measureUnit: 'щепотка' },
            { title: 'Мука', count: '1', measureUnit: 'ст. л.' },
            { title: 'Сливки', count: '250', measureUnit: 'мл.' },
            { title: 'Куринный бульон из кубиков', count: '200', measureUnit: 'мл.' },
            { title: 'Нарезанная петрушка', count: '2', measureUnit: 'ст. л.' },
        ],
        steps: [
            {
                stepNumber: 1,
                description:
                    'Зелёный лук нарезать на 1 см. кружочки. Лук и чеснок на мелкие кубики.',
                image: 'https://media.ovkuse.ru/images/step_attachments/7e1df38e-b6ee-4203-8a4d-53c3208c5844/7e1df38e-b6ee-4203-8a4d-53c3208c5844_1280.webp',
            },
            {
                stepNumber: 2,
                description:
                    'Мясо помыть, высушить, нарезать на полосочки и обжарить на масле.  Посолить, поперчить и вынуть со сковороды.',
                image: 'https://media.ovkuse.ru/images/step_attachments/79ef76b5-9055-4170-839c-0d60a0500e07/79ef76b5-9055-4170-839c-0d60a0500e07_1280.webp',
            },
            {
                stepNumber: 3,
                description: 'Спагетти отварить в течение  10 минут в подсоленной воде.',
                image: 'https://media.ovkuse.ru/images/step_attachments/94c77aae-a81f-4460-8f98-58ed7489f382/94c77aae-a81f-4460-8f98-58ed7489f382_1280.webp',
            },
            {
                stepNumber: 4,
                description:
                    'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
                image: 'https://media.ovkuse.ru/images/step_attachments/2a100cce-0591-45bf-adf4-c4774d41d33e/2a100cce-0591-45bf-adf4-c4774d41d33e_1280.webp',
            },
            {
                stepNumber: 5,
                description: 'Всыпать шафран, корицу и муки, перемешать и коротко прожарить.',
            },
            {
                stepNumber: 6,
                description:
                    'В сковороде, на оставшемся жире поджарить лук до золотистого цвета, добавить чеснок и прожарить ещё около 1 минуты.',
                image: 'https://media.ovkuse.ru/images/step_attachments/751af48e-f274-4ad3-aa36-7ec567166e88/751af48e-f274-4ad3-aa36-7ec567166e88_1280.webp',
            },
            {
                stepNumber: 7,
                description:
                    'Сливки смешать с бульоном, влить к луку и протушить на среднем огне около 10 минут.',
            },
            {
                stepNumber: 8,
                description:
                    'Соус посолить, поперчить, вложить мясо, зелёный лук. Прогреть и осторожно смешать со спагетти. При подаче посыпать нарезанной петрушкой.',
                image: 'https://media.ovkuse.ru/images/recipes/67633a55-03e1-4491-8300-b2c18fc428f5/67633a55-03e1-4491-8300-b2c18fc428f5_420_420.webp',
            },
        ],
    },
    {
        id: '8',
        title: 'Гриль-салат с овощами',
        description: 'Салат с обжаренными на гриле овощами и легкой заправкой.',
        category: ['salads'],
        subcategory: ['warm-salads'],
        image: '/src/assets/recipes/8.jpg',
        bookmarks: 10,
        likes: 80,
        date: '2023-03-20T00:00:00Z',
        time: '25 минут',
        portions: 1,
        nutritionValue: { calories: 150, proteins: 4, fats: 6, carbohydrates: 20 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'баклажан', count: '1', measureUnit: 'шт.' },
            { title: 'оливковое масло', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Обжарить овощи на гриле.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Смешать с заправкой и подавать.',
                image: 'url',
            },
        ],
    },
    {
        id: '9',
        title: 'Гриль-салат с овощами 2',
        description: 'Салат с обжаренными на гриле овощами и легкой заправкой.',
        category: ['salads'],
        subcategory: ['warm-salads'],
        image: '/src/assets/recipes/8.jpg',
        bookmarks: 10,
        likes: 80,
        date: '2023-03-20T00:00:00Z',
        time: '25 минут',
        portions: 1,
        nutritionValue: { calories: 150, proteins: 4, fats: 6, carbohydrates: 20 },
        ingredients: [
            { title: 'цуккини', count: '1', measureUnit: 'шт.' },
            { title: 'болгарский перец', count: '1', measureUnit: 'шт.' },
            { title: 'баклажан', count: '1', measureUnit: 'шт.' },
            { title: 'оливковое масло', count: '0', measureUnit: 'по вкусу' },
        ],
        steps: [
            {
                stepNumber: 1,
                description: 'Обжарить овощи на гриле.',
                image: 'url',
            },
            {
                stepNumber: 2,
                description: 'Смешать с заправкой и подавать.',
                image: 'url',
            },
        ],
    },
];
