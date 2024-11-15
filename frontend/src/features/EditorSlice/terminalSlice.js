import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTerminalOpen: false,
};

export const terminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers: {
        openTerminal: (state) => {
            state.isTerminalOpen = true;
        },
        closeTerminal: (state) => {
            state.isTerminalOpen = false;
        },
    },
});

export const { openTerminal, closeTerminal } = terminalSlice.actions;

export default terminalSlice.reducer;