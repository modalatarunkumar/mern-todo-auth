import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js"
import todoReducer from "./features/todo/todoSlice.js"
import adminReducer from "./features/admin/adminSlice.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
        admin: adminReducer
    }
    
})

export default store;