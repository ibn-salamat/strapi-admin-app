import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from 'notistack';

export const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN

const App = () => {
  return (
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  )
}

export default App
