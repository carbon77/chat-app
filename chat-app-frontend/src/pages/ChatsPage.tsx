import {
    Alert,
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchChats} from "../store/chatsReducer";
import {Link as RouterLink} from "react-router-dom"

export const ChatsPage = () => {
    const {status, data, error} = useAppSelector(state => state.chats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch]);

    return (
        <Box>
            <Stack>
                <Paper elevation={3}>
                    <Typography sx={{px: 2, py: 1}} variant={"h3"}>Chats</Typography>

                    <Box sx={{px: 2, pb: 1}}>
                        {status === 'loading' ? <CircularProgress/> : <>
                            {error ? <Alert severity={"error"}>{error}</Alert> : (
                                <List>
                                    {data?.map(chat => (
                                        <ListItem disablePadding key={chat.name}>
                                            <ListItemButton component={RouterLink} to={`/chats/${chat.id}`}>
                                                <ListItemText primary={chat.name}/>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </>}
                    </Box>
                </Paper>
            </Stack>
        </Box>
    );
};