import { BasicRoutes } from "@/src/router"
import { useCurrentUser } from "@/src/hooks"

const App = () => {
  useCurrentUser()
  
  return (
    <BasicRoutes />
  )
}

export default App
