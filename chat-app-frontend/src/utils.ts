import {Chat} from "./types";

export function getChatTitle(userId?: string, chat?: Chat): string {
    if (!chat) return ""

    if (chat.isDialog && chat.dialogUsersNames && userId) {
        for (const [key, value] of Object.entries(chat.dialogUsersNames)) {
            if (key !== userId) {
                return value
            }
        }
    }
    return chat.name
}

export function truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.slice(0, maxLength - 3) + '...'
    }
    return str
}