import { TextField, FormControl, Button, Box } from "@mui/material"
import { useForm } from "react-hook-form"
import { useSnackbar } from "notistack"
import {
  useCreateProductMutation,
  useUpdateProductByIdMutation,
} from "@/src/api/query/products"
import { CustomModal } from "../modal"
import type { Product } from "@/src/types/product"
import { useEffect } from "react"

type Props = {
  handleClose: () => void
  product?: Product
}

type FormValues = Product["attributes"]

export const CreateUpdateProductModal = ({ handleClose, product }: Props) => {
  const [createProduct, createProductResponse] = useCreateProductMutation()
  const [updateProduct, updateProductResponse] = useUpdateProductByIdMutation()
  const title = product ? "Update product" : "Create product"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: product?.attributes,
  })
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data: FormValues) => {
    product
      ? updateProduct({
          id: product.id,
          attributes: data,
        })
      : createProduct(data)
  }

  useEffect(() => {
    if (createProductResponse.isSuccess) {
      enqueueSnackbar("Created successfully", { variant: "success" })
      handleClose()
    }

    if (createProductResponse.isError) {
      const errorMessage =
        (createProductResponse.error as any)?.data?.error.message ||
        "Something went wrong"
      enqueueSnackbar(errorMessage, { variant: "error" })
    }
  }, [createProductResponse.isSuccess, createProductResponse.isError])

  useEffect(() => {
    if (updateProductResponse.isSuccess) {
      enqueueSnackbar("Updated successfully", { variant: "success" })
      handleClose()
    }

    if (updateProductResponse.isError) {
      const errorMessage =
        (updateProductResponse.error as any)?.data?.error.message ||
        "Something went wrong"
      enqueueSnackbar(errorMessage, { variant: "error" })
    }
  }, [updateProductResponse.isSuccess, updateProductResponse.isError])

  return (
    <>
      <CustomModal title={title} handleClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                label="title"
                variant="outlined"
                {...register("title", {
                  required: true,
                })}
                helperText={errors.title && "title is required"}
                error={Boolean(errors.title)}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                label="price"
                type="number"
                variant="outlined"
                {...register("price")}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                label="product_id"
                variant="outlined"
                {...register("product_id", {
                  required: true,
                })}
                helperText={errors.product_id && "product_id is required"}
                error={Boolean(errors.product_id)}
              />
            </FormControl>
          </Box>
          <Box style={{ marginTop: 15, display: "flex", gap: 15 }}>
            {product ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                type="submit"
                disabled={updateProductResponse.isLoading}
              >
                Update
              </Button>
            ) : (
              <Button
                size="small"
                color="primary"
                variant="contained"
                type="submit"
                disabled={createProductResponse.isLoading}
              >
                Create
              </Button>
            )}
          </Box>
        </form>
      </CustomModal>
    </>
  )
}
