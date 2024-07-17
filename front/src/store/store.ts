import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from '@/src/api/query/products'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector, useDispatch } from 'react-redux'
import { userSlice } from './user'



export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()