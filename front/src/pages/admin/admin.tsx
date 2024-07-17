import { BASE_URL, STRAPI_API_TOKEN } from "@/src/config"
import axios from "axios"
import { useEffect } from "react"

export const Admin = () => {

    const getProducts = async () => {
        try {
            await axios.get(`${BASE_URL}/api/products`, {
                
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