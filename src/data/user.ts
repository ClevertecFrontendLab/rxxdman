export type user = {
    id: string;
    name: string;
    surname: string;
    password: string;
    mail: string;
    ico: string;
};

export type userList = user[];

export const users: userList = [
    {
        id: '0',
        name: 'Екатерина ',
        surname: 'Константинопольская',
        password: '1234',
        mail: 'bake_and_pie',
        ico: '/src/assets/stubs/user.jpg',
    },
    {
        id: '1',
        name: 'Елена ',
        surname: 'Высоцкая',
        password: '1234',
        mail: 'elenapovar',
        ico: '/src/assets/stubs/user2.jpg',
    },
    {
        id: '2',
        name: 'Alex ',
        surname: 'Cook',
        password: '1234',
        mail: 'funtasticooking',
        ico: '/src/assets/stubs/user3.jpg',
    },
];
