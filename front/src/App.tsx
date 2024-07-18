import {
  useNavigate
} from "react-router-dom";
import { BasicRoutes } from "./router";

const App = () => {
  const navigate = useNavigate()
  
  return (
    <BasicRoutes />
  )
}

export default App
