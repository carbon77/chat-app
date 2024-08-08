export interface ReducerState<T> {
    status: 'loading' | 'finished' | 'failed'
    data?: T,
    error?: string,
}

export type Chat = {
    id: string,
    name: string,
    isGroup: boolean,
    sentAt: string,
    userIds: string[],
}

export type User = {
    id: string,
    username: string,
    email: string,
    emailVerified: boolean,
    firstName: string,
    lastName: string,
}