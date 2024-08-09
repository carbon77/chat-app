import {Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {Link as RouterLink, Outlet} from "react-router-dom";
import React from "react";
import {Chat, Notifications, People} from "@mui/icons-material";

type SidebarPageTemplateProps = {
    showSidebar: boolean
}

export const SidebarPageTemplate = ({showSidebar = true}: SidebarPageTemplateProps) => {
    const links = [
        {
            text: 'Chats',
            icon: <Chat color={"primary"}/>,
            to: '/chats',
        },
        {
            text: 'Friends',
            icon: <People color={"primary"}/>,
            to: '/friends',
        },
        {
            text: 'Notifications',
            icon: <Notifications color={"primary"}/>,
            to: '/notifications',
        },
    ]

    return (
        <Grid container spacing={2}>
            {showSidebar ? (
                <Grid item xs={12} md={3}>
                    <Paper elevation={3}>
                        <List>
                            {links.map(link => (
                                <ListItem key={link.text} disablePadding>
                                    <ListItemButton component={RouterLink} to={link.to}>
                                        <ListItemIcon>
                                            {link.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={link.text}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            ) : null}

            <Grid item md={showSidebar ? 9 : 12} xs={12}>
                <Outlet/>
            </Grid>
        </Grid>
    );
};