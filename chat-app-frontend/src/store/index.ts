import {configureStore} from "@reduxjs/toolkit";
import {chatsSlice} from "./chatsReducer";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store