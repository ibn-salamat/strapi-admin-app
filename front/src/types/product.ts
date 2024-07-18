type ImageData = {
    id: number
    attributes: {
        url: string
    }
}

type ProductAttributes = {
    price: number,
    title: string,
    product_id: string,
    image: {
        data: ImageData[]
    }
}

export type Product = {
    id: number
    attributes: ProductAttributes
}

export type UpdateProductPayload = {
    id: number
    image: {id: number}[]
} & Omit<ProductAttributes, "image">

export type CartProduct = Omit<Product['attributes'], "image"> & Pick<Product, "id">
