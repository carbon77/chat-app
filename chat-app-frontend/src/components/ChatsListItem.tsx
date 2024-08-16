import {Chat} from "../types";
import {Avatar, Badge, Card, CardActionArea, CardActions, CardHeader, IconButton} from "@mui/material";
import {MoreVert} from "@mui/icons-material";
import React from 'react'
import {red} from "@mui/material/colors";
import {Link} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import {getChatTitle, truncateString} from "../utils";

export type ChatsListItemProps = {
    chat: Chat
}

export const ChatsListItem = ({chat}: ChatsListItemProps) => {
    const auth = useAuth()
    const userId = auth.user?.profile.sub

    return (
        <Card sx={{
            display: 'flex'
        }}>
            <CardActionArea component={Link} to={`/chats/${chat.id}`}>
                <CardHeader
                    sx={{
                        py: 1.5
                    }}
                    title={getChatTitle(userId, chat)}
                    subheader={chat.lastMessage
                        ? truncateString(`${chat.lastMessage.senderFirstName}: ${chat.lastMessage.text}`, 50)
                        : null
                    }
                    avatar={
                        <Badge
                            badgeContent={chat.countUnreadMessages}
                            color={"primary"}
                            max={99}
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'bottom',
                            }}
                        >
                            <Avatar sx={{bgcolor: red[500]}}>
                                {chat.isDialog ? 'D' : 'C'}
                            </Avatar>
                        </Badge>
                    }
                />
            </CardActionArea>
            <CardActions>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </CardActions>
        </Card>
    );
};