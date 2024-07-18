import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"
import type { User } from "@/src/types/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  tagTypes: ["User"],
  endpoints: builder => ({
    getUserByid: builder.query<User, number>({
      query: id => ({
        url: `/users/${id}?populate=*`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }),
    }),
    
  }),
})

export const {
  useLazyGetUserByidQuery
} = userApi
