import {configureStore} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk'
import {UsersReducer} from "./Users/UsersReducer";
import {AuthReducer} from "./Auth/AuthReducer";
import {ProfileReducer} from "./Profile/ProfileReducer";
import {PostsReducer} from "./Posts/PostsReducer";
import {InitializedAppReducer} from "./Initialized/initializedApp";

export const store = configureStore({
    reducer: {
        initializedApp: InitializedAppReducer,
        usersPage: UsersReducer,
        auth: AuthReducer,
        profile: ProfileReducer,
        posts: PostsReducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(thunk)
    },
})





