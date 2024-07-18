import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"
import type { Product } from "@/src/types/product"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Products"],
  endpoints: builder => ({
    getProducts: builder.query<{ data: Product[] }, void>({
      query: () => ({
        url: `/products`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }),
      providesTags: () => [{ type: "Products" }],
    }),
    getProductByid: builder.query<{ data: Product }, number>({
      query: id => ({
        url: `/products/${id}`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }),
    }),
    createProduct: builder.mutation<{ data: Product }, Product["attributes"]>({
      query: product => ({
        method: "POST",
        url: `/products`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: {
          data: product,
        },
      }),
      invalidatesTags: ["Products"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useLazyGetProductByidQuery,
  useCreateProductMutation,
} = productsApi
