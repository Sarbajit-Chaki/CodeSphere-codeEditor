import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '@/features/Profile/profileSlice'
import sidebarSlice  from '@/features/EditorSlice/sidebarSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    sidebar: sidebarSlice
  },
})