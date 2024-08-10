import {Chat, CreateChatRequest, ReducerState} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

const initialState: ReducerState<Chat[]> = {
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

        builder.addCase(createChat.fulfilled, (state, action) => {
            state.data?.push(action.payload)
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

export const createChat = createAsyncThunk(
    'chats/create',
    async (req: CreateChatRequest): Promise<Chat> => {
        const res = await apiClient.post("/v1/chats", req)
        return res.data
    }
)