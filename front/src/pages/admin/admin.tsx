import { STRAPI_API_TOKEN } from "@/src/App"
import axios from "axios"
import { useEffect } from "react"

export const Admin = () => {

    const getProducts = async () => {
        try {
            await axios.get('http://localhost:1337/api/products', {
                
                headers: {
                    Authorization: `Bearer ${STRAPI_API_TOKEN}`
                }
            })
    
            } catch (error) {
                console.log(error)
            }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return <h1>Admin</h1>
}