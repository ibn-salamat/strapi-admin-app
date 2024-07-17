import type { Product } from "@/src/types/product"
import axios from "axios"
import { useEffect, useState } from "react"
import { List, ListItem } from "@mui/material"
import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"

export const Admin = () => {
    const [products, setProducts] = useState<{attributes: Product}[]>([])

    const getProducts = async () => {
        try {
            const response =  await axios.get(`${BASE_URL}/api/products`, {
                headers: {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`
                }
            })

            setProducts(response.data.data)
            } catch (error) {
                console.log(error)
            }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return <>
        <h1>Admin</h1>


        <List>
        {products.map((el) => {
            const { attributes } = el;

            return <ListItem>
                product_id: {attributes.product_id} <br />
                title: {attributes.title} <br />
                price: {attributes.price}<br />

            </ListItem>
        })}
        </List>
    </>
}