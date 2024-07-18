import {
    TextField,
    FormControl, Button,
    Box
} from "@mui/material"
import { useForm } from "react-hook-form"
import { useSnackbar } from "notistack"
import { useCreateProductMutation } from "@/src/api/query/products"
import { CustomModal } from "../modal"
import type { Product } from "@/src/types/product"
import { useEffect } from "react"

type Props = {
  handleClose: () => void
}

type FormValues = Product["attributes"]

export const CreateUpdateProductModal = ({ handleClose }: Props) => {
  const [createProduct, createProductResponse] = useCreateProductMutation()
  const title = "Create product"

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({})
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data: FormValues) => {
    createProduct(data)
  }

  useEffect(() => {
    if (createProductResponse.isSuccess){
        enqueueSnackbar("Created successfully", { variant: "success"})
        handleClose()
    }

    if (createProductResponse.isError){
        const errorMessage = (createProductResponse.error as any)?.data?.error.message || "Something went wrong"
        enqueueSnackbar(errorMessage , {variant: "error"})
    }
  }, [createProductResponse.isSuccess, createProductResponse.isError])

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
            <Button
              size="small"
              color="primary"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              Create
            </Button>
          </Box>
        </form>
      </CustomModal>
    </>
  )
}
