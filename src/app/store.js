import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todoSlice'
import authReducer from '../features/authSlice'

//Starting a global store
export const store=configureStore({
    reducer: {
        todo:todoReducer, // Key for the todo slice
        auth: authReducer, // Key for the auth slice
      }
})