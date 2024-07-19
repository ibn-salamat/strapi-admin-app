import axios from "axios"
import { BASE_URL } from "@/src/config"

const authService = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
})

export const signUpUser = (data: {
  username: string
  email: string
  password: string
}) => {
  return authService.post("/local/register", data)
}

export const signInUser = (data: { identifier: string; password: string }) => {
  return authService.post("/local",  data)
}
