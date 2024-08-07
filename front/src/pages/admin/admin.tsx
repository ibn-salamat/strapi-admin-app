import {
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
} from "@mui/material"
import {
    useDeleteProductByIdMutation,
    useGetProductsQuery, useUpdateUserCartMutation
} from "@/src/api/query"
import { useEffect, useMemo, useState } from "react"
import { selectCurrentUser, setCurrentUser } from "@/src/store/user"
import { useAppDispatch, useAppSelector } from "@/src/store"
import {
    saveCurrentUserToLocalStorage
} from "@/src/helpers"
import { useNavigate } from "react-router-dom"
import { EnumRoutes } from "@/src/router"
import { UserCart, CreateUpdateProductModal } from "@/src/components"
import type { CartProduct, Product } from "@/src/types/product"
import { BASE_URL } from "@/src/config"
import { selectCartProducts, toggleFromCart } from "@/src/store/cart"
import { useSocket } from "@/src/hooks"

// TODO: move table into components
export const Admin = () => {
  const { eventResponse } = useSocket()
  const { data, isLoading, refetch } = useGetProductsQuery()
  const [deleteProductById] = useDeleteProductByIdMutation()
  const [updateUserCart] = useUpdateUserCartMutation()

  const cartProducts = useAppSelector(selectCartProducts)

  const [isOpenCreateProductModal, setIsOpenProductModal] = useState(false)
  const [productDataToUpdate, setProductDataToUpdate] =
    useState<Product | null>(null)

  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = () => {
    saveCurrentUserToLocalStorage(null)
    dispatch(setCurrentUser(null))
    navigate(EnumRoutes.SignIn)
  }

  const handleToggleCartClick = async (product: CartProduct) => {
    if (!currentUser?.id) return
    const { id, product_id, title, price } = product;

    const connect = []
    const disconnect = []

    const isFound = cartProducts.some(p => p.id === id)
    if (isFound){
        disconnect.push(product.id)
    } else {
        connect.push(product.id)
    }

    await updateUserCart({
        userId: currentUser.id,
        connect,
        disconnect
    })

    dispatch(
      toggleFromCart({
        id,
        product_id,
        title,
        price,
      }),
    )
  }

  useEffect(() => {
    if (eventResponse){
        refetch()
    }
  }, [eventResponse])

  const sortedProducts = useMemo(() => {
    let products = data?.data
    if (!products || Array.isArray(products) && products.length === 0) return []
    // @ts-ignore
    products = [...data.data]
    products.sort((a,b) => Number(a.attributes.price) - Number(b.attributes.price))
    
    return products
  }, [data?.data])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      <UserCart />

      <Box style={{ padding: 25 }}>

        <Typography variant="h4" my={3}>
          Products
          <Button size="small" onClick={logout} style={{ marginLeft: 5 }}>
            Log out
          </Button>
        </Typography>
        <Button variant="outlined" onClick={() => setIsOpenProductModal(true)}>
          Create product
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>product_id</TableCell>
                <TableCell>title</TableCell>
                <TableCell>price</TableCell>
                <TableCell>img</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts.map(({ id, attributes }) => {
                const { product_id, title, price, image } = attributes
                let imageUrl
                if (image.data && image.data.length > 0) {
                  let url = attributes.image.data?.[0].attributes.url
                  if (url) {
                      imageUrl = url.includes("http") ? url : `${BASE_URL}${url}`
                  } 
                }

                const inCart = cartProducts.findIndex(p => p.id === id) > -1

                return (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{product_id}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{price}</TableCell>
                    <TableCell>
                      {imageUrl && (
                        <img src={imageUrl} alt="" width={40} height={40} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            handleToggleCartClick({
                              id,
                              product_id,
                              title,
                              price,
                            })
                          }}
                        >
                          {inCart ? "Remove from cart" : "Add to cart"}
                        </Button>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            setProductDataToUpdate({
                              id,
                              attributes,
                            })
                          }
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => deleteProductById(id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {isOpenCreateProductModal && (
        <CreateUpdateProductModal
          handleClose={() => setIsOpenProductModal(false)}
        />
      )}

      {productDataToUpdate && (
        <CreateUpdateProductModal
          handleClose={() => setProductDataToUpdate(null)}
          product={productDataToUpdate}
        />
      )}
    </>
  )
}
