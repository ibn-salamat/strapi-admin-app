import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLazyGetUserByidQuery } from "@/src/api/query"
import { selectCurrentUser, setCurrentUser } from "@/src/store/user"
import { useAppDispatch, useAppSelector } from "@/src/store"
import { getCurrentUserFromLocalStorage } from "@/src/helpers"
import { EnumRoutes } from "@/src/router"
import { setCart } from "@/src/store/cart"

export const useCurrentUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [getUserById, getUserByIdResponse] = useLazyGetUserByidQuery()
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!currentUser) return
    getUserById(currentUser.id)
  }, [currentUser])

  useEffect(() => {
    if (!getUserByIdResponse.data) return
    dispatch(setCart(getUserByIdResponse.data.cart || []))
  }, [getUserByIdResponse.data])

  // if user not signed in you can not go to Admin Page
  useEffect(() => {
    const user = getCurrentUserFromLocalStorage()
    if (!user) {
      navigate(EnumRoutes.SignIn)
      return
    }

    dispatch(setCurrentUser(user))
  }, [])

  // if user is authorized you can not go to Auth Page
  useEffect(() => {
    if (!currentUser) return
    if (location.pathname === EnumRoutes.SignIn || location.pathname === EnumRoutes.SignUp){
        navigate(EnumRoutes.Admin)
    }
  }, [location.pathname, currentUser])

  return { currentUser }
}
