import {
  TextField,
  FormControl,
  Typography,
  Card,
  Button,
  Box,
} from "@mui/material"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { EnumRoutes } from "@/src/router"
import { signUpUser } from "@/src/api/services"

type FormValues = {
  username: string
  email: string
  password: string
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    defaultValues: {
      email: "test@test.com",
      username: "test",
    },
  })
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const onSubmit = async (data: FormValues) => {
    try {
      await signUpUser({
        username: data.username,
        email: data.email,
        password: data.password,
      })

      enqueueSnackbar("Registered successfullyy", { variant: "success" })
      navigate(EnumRoutes.SignIn)
    } catch (error) {
      let message = ""
      if (axios.isAxiosError(error)) {
        message = error.response?.data.error.message
      }

      enqueueSnackbar(
        message || (error as Error).message || "Something wrong happened",
        { variant: "error" },
      )
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card
        style={{ minWidth: 275, maxWidth: 600, width: "100%", padding: 20 }}
      >
        <Typography variant="h4">Sign Up</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: true,
                })}
                helperText={errors.email && "email is required"}
                error={Boolean(errors.email)}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                label="Username"
                variant="outlined"
                {...register("username", {
                  required: true,
                })}
                helperText={errors.username && "username is required"}
                error={Boolean(errors.username)}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl style={{ marginTop: 15, width: "100%" }}>
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                {...register("password", {
                  required: true,
                })}
                helperText={errors.password && "password is required"}
                error={Boolean(errors.password)}
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
              Sign up
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => navigate(EnumRoutes.SignIn)}
            >
              Sign in
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  )
}
