import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "./pages";
import { Admin } from "./pages/admin";

export enum EnumRoutes {
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  Admin = "/"
}

export const router = createBrowserRouter([
    {
      path: EnumRoutes.SignUp,
      element: <SignUp />,
    },
    {
      path: EnumRoutes.SignIn,
      element: <SignIn />,
    },
    {
      path: EnumRoutes.Admin,
      element: <Admin />
    },
    {
      path: "*",
      element: <Navigate to={EnumRoutes.SignIn} />,
    },
]);