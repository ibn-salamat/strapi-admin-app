import { useAppSelector } from "@/src/store"
import { selectCartProducts } from "@/src/store/cart"
import { Card, Typography } from "@mui/material"

export const UserCart = () => {
  const cartProducts = useAppSelector(selectCartProducts)

    return <Card style={{padding: 25}}>
        <Typography variant="h4">Cart component</Typography>

        <Typography display="inline">
            Selected Products ID: 
            <Typography fontSize={20}  display="inline">
                <code>[{cartProducts.map(p => p.id).join(", ")}]</code>
            </Typography>
        </Typography>
   
        
    </Card>
}