export interface ReducerState<T> {
    status: 'loading' | 'finished' | 'failed'
    data?: T,
    error?: string,
}

export type CreateChatRequest = {
    name: string,
    isDialog: boolean,
    userIds: string[],
}

export type Chat = {
    id: string,
    name: string,
    isDialog: boolean,
    createdAt: string,
    userIds: string[],
    lastMessage?: Message,
    dialogUsersNames?: Record<string, string>,
    countMembers: number,
    countUnreadMessages: number,
}

export type ChatMembership = {
    userId: string,
    charId: string,
    role: 'MEMBER' | 'ADMIN' | 'CREATOR',
    isActive: boolean,
    lastVisited: string,
    joinedAt: string,
    leftAt: string,
    user: User
}

export type User = {
    id: string,
    username: string,
    email: string,
    emailVerified: boolean,
    firstName: string,
    lastName: string,
    isOnline: boolean,
}

export type Message = {
    messageId: string,
    senderId: string,
    chatId: string,
    senderFirstName: string,
    senderLastName: string,
    text: string,
    sentAt: string,
}
