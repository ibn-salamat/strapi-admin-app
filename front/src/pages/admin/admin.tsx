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
import { useDeleteProductByIdMutation, useGetProductsQuery, useLazyGetUserByidQuery } from "@/src/api/query"
import { useEffect, useState } from "react"
import { selectCurrentUser, setCurrentUser } from "@/src/store/user"
import { useAppDispatch, useAppSelector } from "@/src/store"
import {
  getCurrentUserFromLocalStorage,
  saveCurrentUserToLocalStorage,
} from "@/src/helpers"
import { useNavigate } from "react-router-dom"
import { EnumRoutes } from "@/src/router"
import { CreateUpdateProductModal } from "@/src/components"
import type { Product } from "@/src/types/product"
import { BASE_URL } from "@/src/config"

// TODO: move table into components
export const Admin = () => {
  const { data, isLoading } = useGetProductsQuery()
  const [deleteProductById] = useDeleteProductByIdMutation()
  const [getUserById, getUserByIdResponse] = useLazyGetUserByidQuery()

  const [isOpenCreateProductModal, setIsOpenProductModal] = useState(false)
  const [productDataToUpdate, setProductDataToUpdate] = useState<Product | null>(null)

  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const checkUser = () => {
    const user = getCurrentUserFromLocalStorage()
    if (!user) {
      navigate(EnumRoutes.SignIn)
      return
    }

    dispatch(setCurrentUser(user))
  }

  const logout = () => {
    saveCurrentUserToLocalStorage(null)
    dispatch(setCurrentUser(null))
    navigate(EnumRoutes.SignIn)
  }

  useEffect(() => {
    checkUser()
  }, [])

  console.log(getUserByIdResponse)

  useEffect(() => {
    if (!currentUser) return
    getUserById(currentUser.id)
  }, [currentUser])

  if (isLoading) {
    return <CircularProgress />
  }

  console.log(data)

  return (
    <>
      <Box style={{ padding: 25 }}>
        <Typography variant="h4" mb={3}>
          Products
          <Button size="small" onClick={logout} style={{marginLeft: 5}}>Log out</Button>
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
              {data?.data.map(({ id, attributes }) => {
                const { product_id, title, price, image } = attributes
                let imageUrl
                if (image.data && image.data.length > 0){
                    imageUrl = `${BASE_URL}${attributes.image.data?.[0].attributes.url}`
                }

                return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{product_id}</TableCell>
                      <TableCell>{title}</TableCell>
                      <TableCell>{price}</TableCell>
                      <TableCell>
                        {imageUrl && <img src={imageUrl} alt="" width={40} height={40} />}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Button variant="outlined" size="small">
                            Add to cart
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
                          <Button variant="outlined" color="error" size="small" onClick={() => deleteProductById(id)}>
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
