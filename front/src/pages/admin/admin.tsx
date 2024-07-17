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
  useGetProductsQuery,
  useLazyGetProductByidQuery,
} from "@/src/api/query/products"
import { useEffect } from "react"
import { selectCurrentUser, setCurrentUser } from "@/src/store/user"
import { useAppDispatch, useAppSelector } from "@/src/store"

// TODO: move table into components
export const Admin = () => {
  const { data, isLoading } = useGetProductsQuery()
  const [getProductById, { data: product }] = useLazyGetProductByidQuery()

  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  console.log(currentUser)

  useEffect(() => {
    console.log(product?.data.id)
    // dispatch(setCurrentUser({email: "ds"}))
  }, [product])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Box style={{ padding: 25 }}>
      <Typography variant="h4" mb={3}>
        Products
      </Typography>
      <Button variant="outlined">Create product</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>product_id</TableCell>
              <TableCell>title</TableCell>
              <TableCell>price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map(({ id, attributes }) => (
              <TableRow key={id}>
                <TableCell>{attributes.product_id}</TableCell>
                <TableCell>{attributes.title}</TableCell>
                <TableCell>{attributes.price}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        getProductById(id)
                      }}
                    >
                      Open
                    </Button>
                    <Button variant="outlined" size="small">
                      Add to cart
                    </Button>
                    <Button variant="outlined" size="small">
                      Update
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
