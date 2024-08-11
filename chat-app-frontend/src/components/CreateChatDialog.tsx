import {
    Alert,
    Button, Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List, ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import React, {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks";
import {useAuth} from "react-oidc-context";
import {CreateChatRequest} from "../types";
import {createChat} from "../store/chatsReducer";

export type CreateChatDialogProps = {
    open: boolean,
    onClose: () => void
}

export const CreateChatDialog = (props: CreateChatDialogProps) => {
    const { open, onClose } = props
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const [chatName, setChatName] = useState<string>("")
    const {status, data: friends, error} = useAppSelector(state => state.friends)
    const dispatch = useAppDispatch()
    const [userIds, setUserIds] = useState<string[]>([])

    const handleClose = () => {
        onClose()
    }

    const handleToggle = (userId: string) => () => {
        const currentIndex = userIds.indexOf(userId)
        const newUserIds = [...userIds]

        if (currentIndex === -1) {
            newUserIds.push(userId)
        } else {
            newUserIds.splice(currentIndex, 1)
        }

        setUserIds(newUserIds)
    }

    const handleCreate = async () => {
        if (!userId) return

        const req: CreateChatRequest = {
            name: chatName,
            isDialog: false,
            userIds: [
                ...userIds,
                userId
            ]
        }

        await dispatch(createChat(req))
        onClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create chat</DialogTitle>
            <DialogContent dividers sx={{
                minWidth: '500px'
            }}>
                <Stack spacing={1} direction={"row"}>
                    <TextField
                        fullWidth
                        label={"Enter chat name"}
                        variant={"filled"}
                        size={"small"}
                        value={chatName}
                        onChange={e => setChatName(e.currentTarget.value)}
                    />
                </Stack>

                {
                    {
                        loading: <CircularProgress />,
                        failed: <Alert severity={"error"}>{error}</Alert>,
                        finished: <List sx={{overflow: 'auto', maxHeight: '300px'}}>
                            {friends?.map(friend => (
                                <ListItem
                                    key={friend.id}
                                    disablePadding
                                >
                                    <ListItemButton onClick={handleToggle(friend.id)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={userIds.indexOf(friend.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={friend.id} primary={`${friend.firstName} ${friend.lastName}`} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    }[status]
                }

                <List>

                </List>
            </DialogContent>
            <DialogActions>
                <Button variant={"outlined"} color={"error"} onClick={handleClose}>Cancel</Button>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={handleCreate}
                    disabled={chatName.trim() === ""}
                >Create</Button>
            </DialogActions>
        </Dialog>
    );
};