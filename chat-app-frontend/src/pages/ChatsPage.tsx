import {
    Alert,
    Box,
    CircularProgress,
    Container,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchChats} from "../store/chatsReducer";

export const ChatsPage = () => {
    const {status, data, error} = useAppSelector(state => state.chats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch]);

    return (
        <Container>
            <Stack>
                <Paper elevation={3}>
                    <Typography sx={{px: 2, py: 1}} variant={"h3"}>Chats</Typography>

                    <Box sx={{px: 2, pb: 1}}>
                        {status === 'loading' ? <CircularProgress/> : <>
                            {error ? <Alert severity={"error"}>{error}</Alert> : (
                                <List>
                                    {data?.map(chat => (
                                        <ListItemButton key={chat.name}>
                                            <ListItemText primary={chat.name}/>
                                        </ListItemButton>
                                    ))}
                                </List>
                            )}
                        </>}
                    </Box>
                </Paper>
            </Stack>
        </Container>
    );
};