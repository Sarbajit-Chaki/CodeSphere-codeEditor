import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    room: {
        participantsChange: false,
        roomDetails: {},
    }
}

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        toogleparticipantsChange: (state) => {
            state.room.participantsChange = !state.room.participantsChange
        },
        setRoomDetails: (state, action) => {
            state.room.roomDetails = action.payload
        },
    }
})

export const { toogleparticipantsChange, setRoomDetails } = roomSlice.actions

export default roomSlice.reducer