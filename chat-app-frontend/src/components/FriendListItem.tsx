import {User} from "../types";
import {Button, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, MoreHoriz, Person} from "@mui/icons-material";
import React, {useState} from "react";
import {useAppDispatch} from "../hooks";
import {useAuth} from "react-oidc-context";
import {deleteFriend} from "../store/friendsReducer";

type FriendListItemProps = {
    friend: User
}

export const FriendListItem = ({friend}: FriendListItemProps) => {
    const auth = useAuth()
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteFriend = () => {
        const userId = auth.user?.profile.sub

        if (auth.isAuthenticated && userId) {
            dispatch(deleteFriend({userId, friendId: friend.id}))
        }
    }

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <>
                    <Button variant={"text"} color={"primary"} sx={{mr: 1}}>Send message</Button>
                    <IconButton edge={"end"} onClick={handleClick}>
                        <MoreHoriz/>
                    </IconButton>
                </>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <Person/>
                </ListItemIcon>
                <ListItemText primary={friend.firstName} secondary={friend.lastName}/>
            </ListItemButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem onClick={handleDeleteFriend}>
                    <ListItemIcon>
                        <Delete/>
                    </ListItemIcon>
                    Delete
                </MenuItem>
            </Menu>
        </ListItem>
    );
};