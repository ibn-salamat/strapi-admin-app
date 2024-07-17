import { BASE_URL, STRAPI_API_TOKEN } from '@/src/config'
import type { ProductAttributes } from '@/src/types/product'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<{data: {attributes: ProductAttributes}[]}, void>({
      query: () => ({
        url: `/products`,
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }
      })
    }),
  }),
})


export const { useGetProductsQuery } = productsApi