import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { add, getAll, getOne, update, remove, toggle } from "./todoAPI.js";

const initialState = {
    status: "idle",
    message: "",
    todos:[]
}
export const createTodo = createAsyncThunk("todo/createTodo", async(data, {rejectWithValue}) => {
    try {
        return await add(data);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Addition of todo failed");
    }
})

export const fetchAllTodos = createAsyncThunk("todo/fetchAllTodos", async (_, {rejectWithValue}) => {
    try {
        return await getAll();
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Not fetched all Todos");
    }
})

export const fetchATodo = createAsyncThunk("todo/fetchATodo", async (id, {rejectWithValue})=> {
    try {
        return await getOne(id);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "A todo not found");
    }
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async ({id, name}, {rejectWithValue}) => {
    try {
        return await update(id, name);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Update not possible");
    }
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id, {rejectWithValue}) => {
    try {
        return await remove(id);
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Delete Failed");
    }
})

export const toggleTodo = createAsyncThunk("todo/toggleTodo", async (id, {rejectWithValue}) => {
    try {
        return await toggle(id);
    } catch (error) {
        rejectWithValue(error.response?.data?.message || "Toggle failed");
    }
})

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        reset: (state) => {
            state.status = "idle"
            state.message = ""
        },
        resetTodo: (state) => {
            state.todos = []
        }
    },
    extraReducers: builder => {
        // const setPending = (state) => {
        //     state.status = "loading"
        // }
        // const setRejected = (state, action) => {
        //     state.status = "rejected"
        //     state.message = action.payload
        // }
        builder
        .addCase(createTodo.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.todos.push(action.payload.data)
        })
        .addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.todos = action.payload.data
            state.message = action.payload.message || "All Fetched"
        })
        .addCase(fetchATodo.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.todos = [action.payload.data]
            state.message = action.payload.message || "Fetched a todo successfully"
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
            state.status = "succeeded"
            const updated = action.payload.data;
            const index = state.todos.findIndex(todo => todo._id === updated._id)
            if(index !== -1){
                state.todos[index] = updated
            }
            state.message = action.payload.message;
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.status = "succeeded"
            const deletedId = action.payload.data.id;
            state.todos = state.todos.filter(todo => todo._id !== deletedId);
            state.message = action.payload.message;
        })
        .addMatcher(isPending(createTodo, fetchATodo, fetchAllTodos, updateTodo, deleteTodo, toggleTodo), (state) => {
            state.status = "loading"
        })
        .addMatcher(isRejected(createTodo, fetchATodo, fetchAllTodos, updateTodo, deleteTodo, toggleTodo), (state, action)=> {
            state.status = "rejected"
            state.message = action.payload
        })
        //.addMatcher((action) => action.type.endsWith('/pending'), setPending)
        //.addMatcher((action) => action.type.endsWith("/rejected"), setRejected)
    }
})

export const {reset, resetTodo} = todoSlice.actions

export default todoSlice.reducer