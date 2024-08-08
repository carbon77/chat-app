import {configureStore} from "@reduxjs/toolkit";
import {chatsSlice} from "./chatsReducer";
import {friendsSlice} from "./friendsReducer";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer,
        friends: friendsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store