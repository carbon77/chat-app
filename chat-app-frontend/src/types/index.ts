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
    sentAt: string,
    userIds: string[],
    lastMessage?: Message,
    dialogUsersNames?: Record<string, string>
}

export type User = {
    id: string,
    username: string,
    email: string,
    emailVerified: boolean,
    firstName: string,
    lastName: string,
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
