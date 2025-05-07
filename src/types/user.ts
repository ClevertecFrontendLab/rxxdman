export type User = {
    id: string;
    name: string;
    surname: string;
    password: string;
    mail: string;
    ico: string;
    recipes: string[];
    recommendsRecipes: string[];
    followers: number;
};

export type UserList = User[];
