import { AppRoutes } from "@/src/router"
import { useCurrentUser } from "@/src/hooks"

const App = () => {
  useCurrentUser()
  
  return (
    <AppRoutes />
  )
}

export default App
