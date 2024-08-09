import {
    Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControl,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import {useAuth} from "react-oidc-context";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {addMessage, fetchMessagesByChat} from "../store/messagesReducer";
import {Message} from "../types";
import {MoreVert, Send} from "@mui/icons-material";
import {red} from "@mui/material/colors";

export const ChatPage = () => {
    const {chatId} = useParams()
    const auth = useAuth()
    const userId = auth.user?.profile.sub
    const [text, setText] = useState<string>("")
    const stompClient = useStompClient()
    const {status, data: messages, error} = useAppSelector(state => state.messages)
    const messagesListRef = useRef<HTMLElement | null>(null)
    const {data: chats} = useAppSelector(state => state.chats)
    const chat = chats?.find(chat => chat.id === chatId)
    const dispatch = useAppDispatch()

    useSubscription(`/topic/${chatId}`, message => {
        const body = JSON.parse(message.body) as Message
        dispatch(addMessage(body))
    })

    useEffect(() => {
        if (chatId) {
            dispatch(fetchMessagesByChat(chatId)).then(() => {
                if (messagesListRef.current) {
                    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight
                }
            })
        }
    }, [dispatch]);

    const handleSendMessage = async () => {
        if (!text) {
            return
        }

        if (stompClient) {
            stompClient.publish({
                destination: `/app/chat/${chatId}`,
                body: JSON.stringify({
                    senderId: auth.user?.profile.sub,
                    text,
                    chatId
                })
            })
            setText("")
        } else {
            console.log("Error")
        }
    }

    return (
        <Box>
            <Paper elevation={3}>
                <Stack spacing={2} sx={{p: 2}} divider={<Divider flexItem/>}>
                    <Typography variant={"h4"}>{chat?.name}</Typography>
                    <Box sx={{
                        maxHeight: '350px',
                        overflow: 'auto',
                    }} ref={messagesListRef}>
                        {
                            {
                                loading: <CircularProgress/>,
                                failed: <Alert severity={"error"}>{error}</Alert>,
                                finished: <Stack spacing={1} sx={{pr: 3}}>
                                    {messages?.map(message => (
                                        <Card sx={{
                                            width: 'auto',
                                            maxWidth: '400px',
                                            alignSelf: message.senderId === userId ? 'end' : 'start'
                                        }} key={message.messageId}>
                                            <CardHeader
                                                sx={{pb: 0}}
                                                avatar={
                                                    <Avatar sx={{bgcolor: red[500]}}>
                                                        {message.senderFirstName[0] + message.senderLastName[0]}
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton>
                                                        <MoreVert/>
                                                    </IconButton>
                                                }
                                                title={`${message.senderFirstName} ${message.senderLastName}`}
                                                subheader={new Date(message.sentAt).toDateString()}
                                            />
                                            <CardContent>
                                                <Typography variant={"body2"}>
                                                    {message.text}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            }[status]
                        }
                    </Box>
                    <Stack direction={"row"} spacing={2} alignItems={"start"}>
                        <FormControl fullWidth>
                            <TextField
                                multiline
                                maxRows={20}
                                value={text}
                                onChange={e => setText(e.currentTarget.value)}
                                placeholder={"Send message"}
                            />
                        </FormControl>

                        <IconButton color={"primary"} onClick={handleSendMessage}>
                            <Send/>
                        </IconButton>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    );
};