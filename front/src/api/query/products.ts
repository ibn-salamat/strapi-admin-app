import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"
import type { Product } from "@/src/types/product"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  tagTypes: ["Products"],
  endpoints: builder => ({
    getProducts: builder.query<{ data: Product[] }, void>({
      query: () => ({
        url: `/products?populate=*`,
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
    updateProductById: builder.mutation<{ data: Product }, Product>({
      query: product => ({
        method: "PUT",
        url: `/products/${product.id}`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        body: {
          data: product.attributes,
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProductById: builder.mutation<{ data: Product }, number>({
      query: id => ({
        method: "DELETE",
        url: `/products/${id}`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }
      }),
      invalidatesTags: ["Products"]
    }),
  }),
})

export const {
  useGetProductsQuery,
  useLazyGetProductByidQuery,
  useCreateProductMutation,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation
} = productsApi