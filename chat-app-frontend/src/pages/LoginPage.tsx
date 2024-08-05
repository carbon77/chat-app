import {Button, Container, Paper, Stack, Typography} from "@mui/material";
import {useAuth} from "react-oidc-context";
import React from 'react'
import {Navigate} from "react-router-dom";

export const LoginPage = () => {
    const auth = useAuth()

    function onLoginClick() {
        auth.signinRedirect({
            redirect_uri: 'http://localhost:3000/chats',
        })
    }

    if (auth.isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
        <Container sx={{
            mt: '200px',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Paper elevation={3} sx={{
                p: '1em',
                minWidth: {
                    md: '50%',
                    xs: '90%',
                },
            }}>
                <Stack spacing={2} sx={{
                    alignItems: 'center',
                }}>
                    <Typography variant={"h2"} sx={{mb: '50px'}}>Chat App</Typography>

                    <Button fullWidth variant={"contained"} onClick={onLoginClick}>Login</Button>
                    <Button fullWidth variant={"contained"} onClick={() => auth.signoutRedirect()}>Logout</Button>
                </Stack>
            </Paper>
        </Container>
    );
};