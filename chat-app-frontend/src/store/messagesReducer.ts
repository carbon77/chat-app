import {Message, ReducerState} from "../types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const initialState: ReducerState<Message[]> = {
    status: 'loading'
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            state.data?.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchMessagesByChat.pending, (state, _) => {
            state.status = 'loading'
        })

        builder.addCase(fetchMessagesByChat.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'finished'
        })

        builder.addCase(fetchMessagesByChat.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })
    }
})

export const fetchMessagesByChat = createAsyncThunk(
    "messages/getByChat",
    async (chatId: string) => {
        const response = await apiClient.get(`/v1/chats/${chatId}/messages`)
        return response.data
    }
)

export const {addMessage} = messagesSlice.actions