import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "@/src/store"
import type { CartProduct } from '@/src/types/product'
 
type CartState =  {
  products: CartProduct[]
}

const initialState: CartState = {
    products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleFromCart: (state, action: PayloadAction<CartProduct>) => {
        if (state.products.find(p => p.id === action.payload.id)) {
            state.products = state.products.filter(p => p.id !== action.payload.id)
        } else {
            state.products = [...state.products, action.payload]
        }
    },
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
        state.products = action.payload
    },
  },
})

export const { toggleFromCart, setCart } = cartSlice.actions
export const selectCartProducts = (state: RootState) => state.cart.products
export default cartSlice.reducer