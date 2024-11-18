import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socketInstance: "",
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocketInstance: (state, action) => {
            state.socketInstance = action.payload;
        },
    },
});

export const { setSocketInstance } = socketSlice.actions;

export default socketSlice.reducer;