import { createBrowserRouter, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "./pages";

export const router = createBrowserRouter([
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "*",
      element: <Navigate to="sign-in" />,
    },
]);