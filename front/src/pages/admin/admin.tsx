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
  Box
} from "@mui/material"
import { useGetProductsQuery } from "@/src/api/query/products"

export const Admin = () => {
  const { data, isLoading } = useGetProductsQuery()

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <Box style={{padding: 25}}>
      <Typography variant="h5">Products</Typography>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>product_id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map(({attributes}) => (
            <TableRow>
              <TableCell>{attributes.product_id}</TableCell>
              <TableCell>{attributes.title}</TableCell>
              <TableCell>{attributes.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  )
}
