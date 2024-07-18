import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import { Provider } from "react-redux"
import { SnackbarProvider } from "notistack"
import { store } from "./store"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
      <Provider store={store}>
        <Router>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </Router>
      </Provider>
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
