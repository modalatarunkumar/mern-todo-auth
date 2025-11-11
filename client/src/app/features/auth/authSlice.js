import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, signup, fetchProfile } from "./authAPI.js"

const initialState = {
    status: "idle",
    user: null,
    message: ""
}
export const loginUser = createAsyncThunk("auth/loginUser", async (data, {rejectWithValue}) => {
    try {
        return await login(data)        
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed")
    }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, {rejectWithValue}) => {
    try {
        return await logout()
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Logout failed")
    }
})

export const signupUser = createAsyncThunk("auth/signupUser", async (data, {rejectWithValue}) => {
    try {
        return await signup(data)
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Signup failed")
    }
})
export const fetchUser = createAsyncThunk("auth/fetchUser", async(_, {rejectWithValue}) => {
    try {
        return await fetchProfile()
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "No user found")        
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.status= "idle"
            state.message = ""
        }
    },
    extraReducers: builder => {
        const setPending = (state) => {
            state.status = "loading"
        }
        const setRejected = (state, action) => {
            state.status = "error"
            state.message = action.payload
        }
        builder
        .addCase(loginUser.pending, setPending)
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(loginUser.rejected, setRejected)
        .addCase(logoutUser.pending, setPending)
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.user = null
        })
        .addCase(logoutUser.rejected, setRejected)
        .addCase(signupUser.pending, setPending)
        .addCase(signupUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(signupUser.rejected, setRejected)
        .addCase(fetchUser.pending, setPending)
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(fetchUser.rejected, setRejected)
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer