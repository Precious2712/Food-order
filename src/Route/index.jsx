import { Signup } from "@/HomePage";
import { Login } from "@/HomePage/Auth/Login";
import { LandingPage } from "@/pages/MainPage";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Signup />
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/home-page',
        element: <LandingPage />
    }
]);