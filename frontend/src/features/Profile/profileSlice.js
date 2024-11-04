import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : {
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    imageUrl: "",
  }
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.user.firstName = action.payload
    },
    setLastName: (state, action) => {
      state.user.lastName = action.payload
    },
    setAbout: (state, action) => {
      state.user.about = action.payload
    },
    setImageUrl: (state, action) => {
      state.user.imageUrl = action.payload
    },
  }
})

export const { setFirstName, setLastName, setEmail, setAbout, setImageUrl } = profileSlice.actions

export default profileSlice.reducer