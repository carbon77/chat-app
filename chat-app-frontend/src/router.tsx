import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import React from 'react'
import {ProtectedPage} from "./pages/ProtectedPage";
import {LoginPage} from "./pages/LoginPage";
import {Root} from "./pages/Root";
import {Typography} from "@mui/material";
import {ChatsPage} from "./pages/ChatsPage";

const protectedPages: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Navigate to={"/chats"}/>,
            },
            {
                path: '/chats',
                element: <ProtectedPage><ChatsPage/></ProtectedPage>
            },
            {
                path: '/profile',
                element: <ProtectedPage><Typography variant={"h3"}>Profile page</Typography></ProtectedPage>
            },
            {
                path: '/settings',
                element: <ProtectedPage><Typography variant={"h3"}>Settings page</Typography></ProtectedPage>,
            },
        ]
    },
]

const onlyAnonymousPages: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage/>,
    },
]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        errorElement: <div>Page not found</div>,
        children: [
            ...protectedPages,
            ...onlyAnonymousPages,
        ]
    },
])