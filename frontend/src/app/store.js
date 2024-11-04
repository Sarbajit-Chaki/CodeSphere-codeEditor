import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/features/Profile/profileSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer
  },
})