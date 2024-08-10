import {Alert, Box, CircularProgress, Grid, Paper, Stack, Typography} from "@mui/material";
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchChats} from "../store/chatsReducer";
import {ChatsListItem} from "../components/ChatsListItem";

export const ChatsPage = () => {
    const {status, data, error} = useAppSelector(state => state.chats)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch]);

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Paper elevation={3}>
                        <Typography sx={{px: 2, py: 1}} variant={"h3"}>Chats</Typography>

                        <Box sx={{px: 2, pb: 1}}>
                            {
                                {
                                    loading: <CircularProgress/>,
                                    failed: <Alert severity={"error"}>{error}</Alert>,
                                    finished: <Stack spacing={2}>
                                        {data?.map(chat => (
                                            <ChatsListItem chat={chat} key={chat.id}/>
                                        ))}
                                    </Stack>
                                }[status]
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};