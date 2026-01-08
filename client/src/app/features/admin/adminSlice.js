import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminDeleteTodo, fetchAllUsers, fetchAllUsersWithTodos, fetchAUserTodos } from "./adminAPI";

const initialState = {
    status: "idle",
    users: [],
    message:"",
    todosByUserId: {} 
}

export const getAllUsers = createAsyncThunk("admin/getAllUsers", async (_, {rejectWithValue}) => {
    try {
        return await fetchAllUsers();
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Get users failed");
    }
})

export const getAUserTodos = createAsyncThunk("admin/getAUserTodos", async(id, {rejectWithValue}) => {
    try {
        return await fetchAUserTodos(id);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "User Todos fetch failed");
    }
})

export const getAllUsersWithTodos = createAsyncThunk("admin/getAllUsersWithTodos", async(_, {rejectWithValue}) => {
    try {
        return await fetchAllUsersWithTodos();
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Get Users Todos failed");
    }
})

export const deleteTodoByAdmin = createAsyncThunk("admin/deleteTodoByAdmin", async(id, {rejectWithValue}) => {
    try {
        return await adminDeleteTodo(id);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Delete by admin failed");
    }
})

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        reset: (state) => {
            state.message = "";
            state.status = "idle";
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
            state.users = action.payload.data;
        })
        .addCase(getAllUsersWithTodos.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
            state.users = action.payload.data;
        })
        .addCase(deleteTodoByAdmin.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
            
            const {todoId, userId} = action.payload.data;
            // update users.todo (UsersTodos page )
            const user = state.users.find(u => u._id === userId);
            if(user?.todos){
                user.todos = user.todos.filter(todo => todo._id !== todoId);
            }
            // update todosByUserId (UserTodo page)
            if(state.todosByUserId[userId]){
                state.todosByUserId[userId] = state.todosByUserId[userId].filter(todo => todo._id !== todoId)
            }
        })
        .addCase(getAUserTodos.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
            
            const {todos, userId} = action.payload.data;
            state.todosByUserId[userId] = todos;
        })
        .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
            state.status = "loading";
        })
        .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
            state.status = "rejected";
            state.message = action.payload
        })
    }
})
export const { reset } = adminSlice.actions

export default adminSlice.reducer;