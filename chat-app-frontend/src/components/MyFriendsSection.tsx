import {Alert, Button, CircularProgress, List, Paper, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {deleteFriend, fetchFriends} from "../store/friendsReducer";
import {useAuth} from "react-oidc-context";
import {UserListItem} from "./UserListItem";
import {Delete} from "@mui/icons-material";
import {Chat, CreateChatRequest, User} from "../types";
import apiClient from "../apiClient";
import {useNavigate} from "react-router-dom";
import {createChat} from "../store/chatsReducer";

export const MyFriendsSection = () => {
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const {status, data: friends, error} = useAppSelector(state => state.friends)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuthenticated && userId) {
            dispatch(fetchFriends(userId))
        }
    }, [dispatch]);

    const handleDeleteFriend = (friendId: string) => () => {
        if (auth.isAuthenticated && userId) {
            dispatch(deleteFriend({userId, friendId}))
        }
    }

    const handleSendMessage = (friend: User) => async () => {
        if (!userId) return

        try {
            const dialog: Chat = await apiClient.get("/v1/chats/findDialog", {
                params: {
                    u1: userId,
                    u2: friend.id,
                },
            }).then(res => res.data)
            navigate(`/chats/${dialog.id}`)
        } catch (e) {
            const req: CreateChatRequest = {
                name: `Dialog ${auth.user?.profile.name} and ${friend.firstName} ${friend.lastName}`,
                isDialog: true,
                userIds: [userId, friend.id]
            }
            const dialog = await dispatch(createChat(req)).unwrap()
            navigate(`/chats/${dialog.id}`)
        }
    }

    return (
        <Paper elevation={3}>
            <Typography variant={"h4"} sx={{px: 2, py: 1}}>Friends</Typography>
            {
                {
                    loading: <CircularProgress/>,
                    failed: <Alert severity={"error"}>{error}</Alert>,
                    finished: <List>
                        {friends?.map(friend => (
                            <UserListItem
                                key={friend.id}
                                friend={friend}
                                secondaryAction={
                                    <Button
                                        variant={"text"}
                                        color={"primary"}
                                        size={"small"}
                                        onClick={handleSendMessage(friend)}
                                    >Send message</Button>
                                }
                                menuActions={[
                                    {
                                        text: 'Delete',
                                        icon: <Delete/>,
                                        onClick: handleDeleteFriend(friend.id),
                                    }
                                ]}
                            />
                        ))}
                    </List>
                }[status]
            }
        </Paper>
    );
};