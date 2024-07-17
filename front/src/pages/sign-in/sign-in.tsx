import {
  TextField,
  FormControl,
  Typography,
  Card,
  Button,
  Box,
} from "@mui/material"
import { useForm } from "react-hook-form"

type FormValues = {
    email: string
    password: string
}

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card style={{ minWidth: 275, maxWidth: 600, width: "100%", padding: 20 }}>
          <Typography variant="h4">Sign in</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormControl style={{marginTop: 15, width: "100%"}}>
            <TextField 
                label="Email"
                variant="outlined"
                {...register("email", {
                    required: true
                })}
                helperText={errors.email && "email is required"}
                error={Boolean(errors.email)}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl style={{marginTop: 15, width: "100%"}}>
            <TextField 
                type="password" 
                variant="outlined"
                label="Password"  
                {...register("password", {
                    required: true
                })}
                helperText={errors.password && "password is required" }
                error={Boolean(errors.password)}
            />
          </FormControl>
        </Box>

        <Box style={{marginTop: 15, display: "flex", gap: 15}}>
            <Button size="small" color="primary" variant="contained" type="submit">Sign in</Button>
            <Button size="small" color="primary">Sign up</Button>
        </Box>
        </form>
      </Card>
    </Box>
  )
}
