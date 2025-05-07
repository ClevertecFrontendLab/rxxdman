export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};

export type SubCategories = SubCategory[];

export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategories;
    rootCategoryId?: string;
};

export type Categories = Category[];
