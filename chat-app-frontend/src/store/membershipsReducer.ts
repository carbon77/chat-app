import {ChatMembership, ReducerState} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const initialState: ReducerState<ChatMembership[]> = {
    status: 'loading'
}

export const membershipsSlice = createSlice({
    name: 'memberships',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchMemberships.pending, (state, _) => {
            state.status = 'loading'
        })

        builder.addCase(fetchMemberships.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'finished'
        })

        builder.addCase(fetchMemberships.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })
    }
})

export const fetchMemberships = createAsyncThunk(
    'memberships/fetch',
    async (chatId: string): Promise<ChatMembership[]> => {
        const response = await apiClient.get(`/v1/chats/${chatId}/members`)
        return response.data
    }
)