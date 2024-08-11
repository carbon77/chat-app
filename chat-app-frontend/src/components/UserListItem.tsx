import {User} from "../types";
import {Badge, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {MoreHoriz, Person} from "@mui/icons-material";
import React, {MouseEventHandler, useState} from "react";

type UserListItemProps = {
    friend: User,
    secondaryAction?: React.ReactNode,
    menuActions?: {
        text: string,
        icon?: React.ReactNode,
        onClick: MouseEventHandler
    }[]
}

export const UserListItem = ({friend, secondaryAction, menuActions}: UserListItemProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <>
                    {secondaryAction}
                    {menuActions?.length ? (
                        <IconButton edge={"end"} onClick={handleClick}>
                            <MoreHoriz/>
                        </IconButton>
                    ) : null}
                </>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <Badge badgeContent={friend.isOnline ? " " : 0} color={"success"} variant={"dot"}>
                        <Person/>
                    </Badge>
                </ListItemIcon>
                <ListItemText primary={friend.firstName} secondary={friend.lastName}/>
            </ListItemButton>
            {menuActions?.length ? (
                <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                    {menuActions.map(action => (
                        <MenuItem key={action.text} onClick={action.onClick}>
                            <ListItemIcon>
                                {action.icon}
                            </ListItemIcon>
                            {action.text}
                        </MenuItem>
                    ))}
                </Menu>
            ) : null}
        </ListItem>
    );
};