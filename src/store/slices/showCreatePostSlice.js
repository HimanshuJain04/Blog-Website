import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
};

export const showCreatePostSlice = createSlice({
    name: "showCreatePost",
    initialState,
    reducers: {
        setShowCreatePost: (state) => {
            state.value = !state.value;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setShowCreatePost } = showCreatePostSlice.actions
export default showCreatePostSlice.reducer