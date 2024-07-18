import type { CartProduct } from "./product"

export type User = {
    email: string
    id: number
    cart: CartProduct[]
}
