import {
  RouterProvider,
} from "react-router-dom";
import { router } from "./router";
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux'
import { store } from "@/src/store";

const App = () => {
  return (
    <SnackbarProvider>
      <Provider store={store}>
       <RouterProvider router={router} />
      </Provider>
    </SnackbarProvider>
  )
}

export default App
