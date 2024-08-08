import {
    Alert,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    List,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Search} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchFriendsSearch} from "../store/friendsSearchReducer";
import {useAuth} from "react-oidc-context";
import {UserListItem} from "./UserListItem";
import {addFriend, deleteFriend, fetchFriends} from "../store/friendsReducer";

export const SearchFriendsSection = () => {
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const [query, setQuery] = useState<string>("")
    const {status, data: users, error} = useAppSelector(state => state.friendsSearch)
    const {status: friendsStatus, data: friends} = useAppSelector(state => state.friends)
    const friendsId = friends ? new Set(friends.map(friend => friend.id)) : null
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (auth.isAuthenticated && userId) {
            dispatch(fetchFriendsSearch({userId, query}))

            if (friendsStatus === 'loading') {
                dispatch(fetchFriends(userId))
            }
        }
    }, [dispatch]);

    const handleSearch = () => {
        if (auth.isAuthenticated && userId) {
            dispatch(fetchFriendsSearch({userId, query}))
        }
    }

    const handleAddFriend = (friendId: string) => async () => {
        if (userId) {
            await dispatch(addFriend({userId, friendId}))
            await dispatch(fetchFriends(userId))
        }
    }

    const handleDeleteFriend = (friendId: string) => async () => {
        if (userId) {
            await dispatch(deleteFriend({userId, friendId}))
            await dispatch(fetchFriends(userId))
        }
    }

    return (
        <Paper elevation={3}>
            <Stack>
                <Typography variant={"h4"} sx={{px: 2, pt: 1}}>Search</Typography>
                <FormControl sx={{p: 2}}>
                    <TextField
                        placeholder={"Find friends..."}
                        value={query}
                        size={"small"}
                        onChange={e => setQuery(e.currentTarget.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    <IconButton onClick={handleSearch}>
                                        <Search color={"primary"}/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                <Divider/>
                {
                    {
                        loading: <CircularProgress/>,
                        failed: <Alert severity={"error"}>{error}</Alert>,
                        finished: <List>
                            {users?.map(user => (
                                <UserListItem
                                    key={user.id}
                                    friend={user}
                                    secondaryAction={
                                        <>
                                            {friendsId?.has(user.id) ? (
                                                <Button
                                                    variant={"text"}
                                                    color={"error"}
                                                    size={"small"}
                                                    onClick={handleDeleteFriend(user.id)}>
                                                    Delete friend
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant={"text"}
                                                    color={"primary"}
                                                    size={"small"}
                                                    onClick={handleAddFriend(user.id)}>
                                                    Add friend
                                                </Button>
                                            )}
                                        </>
                                    }
                                />
                            ))}
                        </List>
                    }[status]
                }
            </Stack>
        </Paper>
    );
};