import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"
import type { Product } from "@/src/types/product"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: builder => ({
    getUserByid: builder.query<{ data: Product }, number>({
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
