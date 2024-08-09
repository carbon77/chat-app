import {useAuth} from "react-oidc-context";
import {Navigate} from "react-router-dom";
import React from "react";
import {Alert, CircularProgress, Stack, Typography} from "@mui/material";

type ProtectedPageProps = {
    children: React.ReactNode
}

export const ProtectedPage = (props: ProtectedPageProps) => {
    const auth = useAuth()

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>
        case "signinRedirect":
            return <div>Signing you out...</div>
    }

    if (auth.isLoading) {
        return (
            <Stack>
                <Typography variant={"h1"}>Loading</Typography>
                <CircularProgress/>
            </Stack>
        )
    }

    if (auth.error) {
        return (
            <Stack>
                <Typography variant={"h1"}>Oops...</Typography>
                <Alert severity={"error"}>{auth.error.message}</Alert>
            </Stack>
        )
    }

    if (auth.isAuthenticated) {
        return <>
            {props.children}
        </>
    }

    return <Navigate to={"/login"}/>
};