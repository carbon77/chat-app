import {AppBar, Button, Container, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import React from 'react'
import {useAuth} from "react-oidc-context";
import {AccountCircle, Chat as ChatIcon} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export const MyAppBar = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position={"fixed"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{
                    px: '20%',
                }}>
                    <ChatIcon onClick={() => navigate("/")} sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            flexGrow: 1,
                        }}
                    >
                        Chat App
                    </Typography>
                    {auth.isAuthenticated ? (
                        <div>
                            <Button
                                size="large"
                                color="inherit"
                                onClick={handleMenu}
                                endIcon={<AccountCircle/>}
                            >
                                {auth.user?.profile.name}
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                                <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
                                <MenuItem onClick={() => auth.signoutRedirect()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : null}
                </Toolbar>
            </Container>
        </AppBar>
    );
};