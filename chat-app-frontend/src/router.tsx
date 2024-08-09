import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import React from 'react'
import {ProtectedPage} from "./pages/ProtectedPage";
import {LoginPage} from "./pages/LoginPage";
import {Root} from "./pages/Root";
import {Typography} from "@mui/material";
import {ChatsPage} from "./pages/ChatsPage";
import {SidebarPageTemplate} from "./pages/SidebarPageTemplate";
import {FriendsPage} from "./pages/FriendsPage";
import {NotificationsPage} from "./pages/NotificationsPage";
import {ChatPage} from "./pages/ChatPage";

const protectedPages: RouteObject[] = [
    {
        path: '/',
        element: <SidebarPageTemplate showSidebar={true}/>,
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
                path: '/chats/:chatId',
                element: <ProtectedPage><ChatPage/></ProtectedPage>
            },
            {
                path: '/profile',
                element: <ProtectedPage><Typography variant={"h3"}>Profile page</Typography></ProtectedPage>
            },
            {
                path: '/settings',
                element: <ProtectedPage><Typography variant={"h3"}>Settings page</Typography></ProtectedPage>,
            },
            {
                path: '/friends',
                element: <ProtectedPage><FriendsPage/></ProtectedPage>
            },
            {
                path: '/notifications',
                element: <ProtectedPage><NotificationsPage/></ProtectedPage>
            }
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