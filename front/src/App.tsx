import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from 'notistack';


const App = () => {
  return (
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  )
}

export default App
