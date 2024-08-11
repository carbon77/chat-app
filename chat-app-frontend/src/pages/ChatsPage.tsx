import {Alert, Box, CircularProgress, Grid, IconButton, Paper, Stack, TextField} from "@mui/material";
import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchChats} from "../store/chatsReducer";
import {ChatsListItem} from "../components/ChatsListItem";
import {AddComment, MoreVert} from "@mui/icons-material";
import {getChatTitle} from "../utils";
import {useAuth} from "react-oidc-context";
import {CreateChatDialog} from "../components/CreateChatDialog";

export const ChatsPage = () => {
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [openCreateChatDialog, setOpenCreateChatDialog] = useState<boolean>(false)
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
                        <Stack spacing={1} direction={"row"} sx={{p: 2}} alignItems={"center"}>
                            <TextField
                                fullWidth
                                label={"Search"}
                                variant={"filled"}
                                size={"small"}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.currentTarget.value)}
                            />

                            <IconButton onClick={() => setOpenCreateChatDialog(true)}>
                                <AddComment/>
                            </IconButton>

                            <IconButton>
                                <MoreVert/>
                            </IconButton>
                        </Stack>

                        <Box sx={{px: 2, pb: 1}}>
                            {
                                {
                                    loading: <CircularProgress/>,
                                    failed: <Alert severity={"error"}>{error}</Alert>,
                                    finished: <Stack spacing={2}>
                                        {data
                                            ?.filter(chat => getChatTitle(userId, chat)
                                                .toLowerCase()
                                                .includes(searchQuery?.toLowerCase())
                                            )
                                            .map(chat => (
                                                <ChatsListItem chat={chat} key={chat.id}/>
                                            ))
                                        }
                                    </Stack>
                                }[status]
                            }
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <CreateChatDialog
                open={openCreateChatDialog}
                onClose={() => setOpenCreateChatDialog(false)}
            />
        </Box>
    );
};