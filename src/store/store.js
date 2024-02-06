import { configureStore } from "@reduxjs/toolkit";
import showCreatePostReducer from "./slices/showCreatePostSlice";
import authorizeUserReducer from "./slices/authorizeUser";

export const store = configureStore({
    reducer: {
        showCreatePost: showCreatePostReducer,
        authorizeUser: authorizeUserReducer,
    },
});