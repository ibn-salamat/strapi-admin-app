type ProductAttributes = {
    price: number,
    title: string,
    product_id: string
}

export type Product = {
    id: number
    attributes: ProductAttributes
}