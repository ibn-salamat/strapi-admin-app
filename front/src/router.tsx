import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "./pages";

export enum EnumRoutes {
  SignIn = "/sign-in",
  SignUp = "/sign-up",
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
      path: "*",
      element: <Navigate to={EnumRoutes.SignIn} />,
    },
]);