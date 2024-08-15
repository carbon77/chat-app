import {configureStore} from "@reduxjs/toolkit";
import {chatsSlice} from "./chatsReducer";
import {friendsSlice} from "./friendsReducer";
import {friendsSearchSlice} from "./friendsSearchReducer";
import {messagesSlice} from "./messagesReducer";
import {membershipsSlice} from "./membershipsReducer";

const store = configureStore({
    reducer: {
        chats: chatsSlice.reducer,
        friends: friendsSlice.reducer,
        friendsSearch: friendsSearchSlice.reducer,
        messages: messagesSlice.reducer,
        memberships: membershipsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store