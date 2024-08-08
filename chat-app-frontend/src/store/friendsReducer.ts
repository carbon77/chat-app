import {ReducerState, User} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const initialState: ReducerState<User[]> = {
    status: 'loading'
}

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFriends.pending, (state, _) => {
            state.status = 'loading'
        })

        builder.addCase(fetchFriends.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'finished'
        })

        builder.addCase(fetchFriends.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })

        builder.addCase(deleteFriend.fulfilled, (state, action) => {
            state.data = state.data?.filter(user => user.id !== action.payload)
        })
    },
})

export const fetchFriends = createAsyncThunk(
    'friends/fetch',
    async (userId: string, thunkApi): Promise<User[]> => {
        const response = await apiClient.get(`/v1/users/${userId}/friends`)
        return response.data
    }
)

export const deleteFriend = createAsyncThunk(
    'friends/delete',
    async ({userId, friendId}: { userId: string, friendId: string }, thunkAPI) => {
        const response = await apiClient.delete(`/v1/users/${userId}/friends/${friendId}`)
        return friendId
    }
)

export const addFriend = createAsyncThunk(
    'friends/add',
    async ({userId, friendId}: { userId: string, friendId: string }, thunkAPI) => {
        const response = await apiClient.post(`/v1/users/${userId}/friends/${friendId}`)
        return friendId
    }
)