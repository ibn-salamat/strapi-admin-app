type ImageData = {
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