import {
  TextField,
  FormControl,
  Typography,
  Card,
  Button,
  Box,
} from "@mui/material"

export const SignIn = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card style={{ minWidth: 275, maxWidth: 600, width: "100%", padding: 20 }}>
          <Typography variant="h4">Sign in</Typography>

        <Box>
          <FormControl style={{marginTop: 15, width: "100%"}}>
            <TextField 
                label="Email"
                variant="outlined"
                // helperText="Error" 
                // error
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl style={{marginTop: 15, width: "100%"}}>
            <TextField 
                type="password" 
                variant="outlined"
                label="Password"  
                // helperText="Error" 
                // error 
            />
          </FormControl>
        </Box>

        <Box style={{marginTop: 15, display: "flex", gap: 15}}>
            <Button size="small" color="primary" variant="contained">Sign in</Button>
            <Button size="small" color="primary">Sign up</Button>
        </Box>
      </Card>
    </Box>
  )
}
