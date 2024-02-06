import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

export const authorizeUserSlice = createSlice({
    name: "authorizeUser",
    initialState,
    reducers: {
        setUserAuthorize: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setUserAuthorize } = authorizeUserSlice.actions
export default authorizeUserSlice.reducer
