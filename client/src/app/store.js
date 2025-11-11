import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js"
import todoReducer from "./features/todo/todoSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer
    }
    
})

export default store;