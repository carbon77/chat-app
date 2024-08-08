import {configureStore} from "@reduxjs/toolkit";
import {chatsSlice} from "./chatsReducer";
import {friendsSlice} from "./friendsReducer";
import {friendsSearchSlice} from "./friendsSearchReducer";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer,
        friends: friendsSlice.reducer,
        friendsSearch: friendsSearchSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store