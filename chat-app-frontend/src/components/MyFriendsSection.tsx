import {Alert, CircularProgress, List, Paper, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchFriends} from "../store/friendsReducer";
import {useAuth} from "react-oidc-context";
import {FriendListItem} from "./FriendListItem";

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

    return (
        <Paper elevation={3}>
            <Typography variant={"h4"} sx={{px: 2, py: 1}}>Friends</Typography>
            {
                {
                    loading: <CircularProgress/>,
                    failed: <Alert severity={"error"}>{error}</Alert>,
                    finished: <List>
                        {friends?.map(friend => (
                            <FriendListItem key={friend.id} friend={friend}/>
                        ))}
                    </List>
                }[status]
            }
        </Paper>
    );
};