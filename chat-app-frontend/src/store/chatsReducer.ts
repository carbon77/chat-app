import {Chat} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export type ChatsReducerState = {
    status: 'finished' | 'loading' | 'failed',
    data?: Chat[],
    error?: string
}

const initialState: ChatsReducerState = {
    status: 'loading',
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchChats.pending, (state, _) => {
            state.status = 'loading'
        })

        builder.addCase(fetchChats.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'finished'
        })

        builder.addCase(fetchChats.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })
    },
})

export const fetchChats = createAsyncThunk(
    'chats/fetch',
    async (_: void) => {
        const response = await apiClient.get("/v1/chats")
        return response.data as Chat[]
    }
)