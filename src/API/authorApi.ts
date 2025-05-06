// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// const API_URL = 'https://marathon-api.clevertec.ru/';

// export type author {
//     favorites": [],
//     "others": [
//       {
//         "_id": "67e41cd40f68c23754bc1e06",
//         "firstName": "Mr. Cashews",
//         "lastName": "™",
//         "login": "MrCashews",
//         "subscribersCount": 1,
//         "bookmarksCount": 1,
//         "isFavorite": false,
//         "notes": [],
//         "newRecipesCount": 0
//       },
//       {
//         "_id": "67e41d2a0f68c23754bc1e07",
//         "firstName": "Mr. Cashews",
//         "lastName": "™",
//         "login": "MrCashews (the real one)",
//         "subscribersCount": 0,
//         "bookmarksCount": 0,
//         "isFavorite": false,
//         "notes": [],
//         "newRecipesCount": 0
//       },
//       {
//         "_id": "67e422130f68c23754bc1e08",
//         "firstName": "vasya",
//         "lastName": "Pupkin",
//         "login": "edudo",
//         "subscribersCount": 0,
//         "bookmarksCount": 0,
//         "isFavorite": false,
//         "notes": [],
//         "newRecipesCount": 0
//       }
// }

// export const categoryApi = createApi({
//     reducerPath: 'categoryApi',
//     baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
//     endpoints: (builder) => ({
//       getCategories: builder.query<categoriesResponse, void>({
//         query: () => 'category',
//       }),
//     }),
//   });

//   export const { useGetCategoriesQuery } = categoryApi;
