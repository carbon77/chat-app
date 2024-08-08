import {ReducerState, User} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../apiClient";

export const initialState: ReducerState<User[]> = {
    status: 'loading'
}

export const friendsSearchSlice = createSlice({
    name: 'friends/search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFriendsSearch.pending, (state, _) => {
            state.status = 'loading'
        })

        builder.addCase(fetchFriendsSearch.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'finished'
        })

        builder.addCase(fetchFriendsSearch.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        })
    },
})

export const fetchFriendsSearch = createAsyncThunk(
    'friends/search',
    async ({userId, query}: {userId: string, query: string}, thunkApi): Promise<User[]> => {
        const response = await apiClient.get(`/v1/users`, {
            params: {
                q: query
            }
        })
        return response.data.filter((user: User) => user.id !== userId)
    }
)