import {
    Alert,
    Badge,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {Chat} from "../types";
import React, {useEffect, useState} from 'react'
import {Add, Attachment, KeyboardArrowDown, Notifications, Person} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchMemberships} from "../store/membershipsReducer";
import {useAuth} from "react-oidc-context";

export type ChatDialogProps = {
    chat?: Chat,
    open: boolean,
    onClose: () => void
}

export const ChatDialog = (props: ChatDialogProps) => {
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const {chat, open, onClose} = props
    const [tabSelected, setTabSelected] = useState(0)
    const {status, error, data: members} = useAppSelector(state => state.memberships)
    const admins = members?.filter(member => member.role !== 'MEMBER')
    const userMembership = members?.find(member => member.userId === userId)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (open && chat) {
            dispatch(fetchMemberships(chat.id))
        }
    }, [open, chat, dispatch]);

    const handleTabsChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabSelected(newValue)
    }

    const handleClose = () => {
        onClose()
    }

    if (!open || !chat) {
        return null
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Stack>
                    <Typography variant={"h5"}>{chat.name}</Typography>
                    <Typography variant={"caption"}>{`${chat.countMembers} members`}</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent dividers={true} sx={{
                p: 0,
                minWidth: '400px',
            }}>
                <Stack spacing={1} divider={<Divider/>}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Attachment/>
                                </ListItemIcon>
                                <ListItemText primary={"Attachments"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Notifications/>
                                </ListItemIcon>
                                <ListItemText primary={"Notifications"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>

                    <Box>
                        {{
                            loading: <CircularProgress/>,
                            failed: <Alert severity={"error"}>{error}</Alert>,
                            finished: <>
                                <Tabs value={tabSelected} onChange={handleTabsChange}>
                                    <Tab label={`Members ${chat.countMembers}`}/>
                                    <Tab label={`Admins ${admins ? admins.length : 0}`}/>
                                </Tabs>
                                <List>
                                    {userMembership?.role !== 'MEMBER' ? (
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <Add/>
                                                </ListItemIcon>
                                                <ListItemText primary={"Add member"}/>
                                            </ListItemButton>
                                        </ListItem>
                                    ) : null}
                                    {{
                                        0: members,
                                        1: admins,
                                    }[tabSelected]?.map(member => (
                                        <ListItem key={member.user.id} disablePadding secondaryAction={
                                            (userMembership?.role !== 'MEMBER' || member.role !== 'MEMBER') ? (
                                                <Button
                                                    size={"small"}
                                                    endIcon={userMembership?.role === 'CREATOR' ?
                                                        <KeyboardArrowDown/> : null}
                                                >{member.role}</Button>
                                            ) : null
                                        }>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <Badge badgeContent={member.user.isOnline ? " " : 0}
                                                           color={"success"} variant={"dot"}>
                                                        <Person/>
                                                    </Badge>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={member.user.firstName + " " + member.user.lastName}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        }[status]}

                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};