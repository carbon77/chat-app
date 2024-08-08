import {People, Search} from "@mui/icons-material";
import {Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";
import React, {useState} from 'react'
import {MyFriendsSection} from "../components/MyFriendsSection";
import {SearchFriendsSection} from "../components/SearchFriendsSection";

export const FriendsPage = () => {
    const [section, setSection] = useState<'friends' | 'search'>('friends')

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {
                        {
                            friends: <MyFriendsSection/>,
                            search: <SearchFriendsSection/>,
                        }[section]
                    }
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3}>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setSection('friends')}>
                                    <ListItemIcon>
                                        <People color={"primary"}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"My friends"}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => setSection('search')}>
                                    <ListItemIcon>
                                        <Search color={"primary"}/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Search"}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};