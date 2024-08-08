import {Alert, Button, CircularProgress, List, Paper, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {deleteFriend, fetchFriends} from "../store/friendsReducer";
import {useAuth} from "react-oidc-context";
import {UserListItem} from "./UserListItem";
import {Delete} from "@mui/icons-material";

export const MyFriendsSection = () => {
    const auth = useAuth()
    const {status, data: friends, error} = useAppSelector(state => state.friends)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const userId = auth.user?.profile.sub
        if (auth.isAuthenticated && userId) {
            dispatch(fetchFriends(userId))
        }
    }, [dispatch]);

    const handleDeleteFriend = (friendId: string) => () => {
        const userId = auth.user?.profile.sub

        if (auth.isAuthenticated && userId) {
            dispatch(deleteFriend({userId, friendId}))
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
                                    <Button variant={"text"} color={"primary"} size={"small"}>Send message</Button>
                                }
                                menuActions={[
                                    {
                                        text: 'Delete',
                                        icon: <Delete />,
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