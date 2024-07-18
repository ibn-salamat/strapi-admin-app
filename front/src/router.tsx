import { Navigate, Route, Routes } from "react-router-dom"
import { SignIn, SignUp } from "./pages"
import { Admin } from "./pages/admin"
import React from "react"

export enum EnumRoutes {
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Admin = "/",
}

export const routes = [
  <Route path={EnumRoutes.SignUp} element={<SignUp />} />,
  <Route path={EnumRoutes.SignIn} element={<SignIn />} />,
  <Route path={EnumRoutes.Admin} element={<Admin />} />,
  <Route path="*" element={<Navigate to={EnumRoutes.SignIn} />} />,
]

export const BasicRoutes = () => {
  return (
    <Routes>
      {routes.map((R, i) => <React.Fragment key={i}>{R}</React.Fragment>)}
    </Routes>
  )
}
