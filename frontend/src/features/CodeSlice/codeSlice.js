import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userCode: `// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world.\n`,
}

const codeSlice = createSlice({
    name: "code",
    initialState,
    reducers: {
        setUserCode: (state, action) => {
            state.userCode = action.payload;
        },
    },
});

export const { setUserCode } = codeSlice.actions;

export default codeSlice.reducer;