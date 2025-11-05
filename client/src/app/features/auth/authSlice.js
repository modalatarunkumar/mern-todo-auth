import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import conf from "../../../conf/index.js"
import axios from "axios";

const initialState = {
    status: false,
    user: null,
    loading: false,
    message: ""
}
export const loginUser = createAsyncThunk("auth/loginUser", async (data, {rejectWithValue}) => {
    try {
        const result = await axios.post(`${conf.appUrl}/auth/login`, data, {withCredentials: true})
        return result?.data
        
    } catch (error) {
        rejectWithValue(error.response?.data?.message || "Login failed")
    }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, {rejectWithValue}) => {
    try {
        const result = await axios.get(`${conf.appUrl}/auth/logout`, {withCredentials: true})
        return result?.data
    } catch (error) {
        rejectWithValue(error.response?.data?.message || "Logout failed")
    }
})

export const signupUser = createAsyncThunk("auth/signupUser", async (data, {rejectWithValue}) => {
    try {
        const result = await axios.post(`${conf.appUrl}/auth/signup`, data, {withCredentials: true})
        return result?.data
    } catch (error) {
        rejectWithValue(error.response.data.message || "Signup failed")
    }
})
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = true
            state.loading = false
            state.message = action.payload.message
            state.user = action.payload.user
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.message = action.payload.error
            state.user = null
            state.status = false
        })
        .addCase(logoutUser.pending, (state) => {
            state.loading = true
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.status = false
            state.loading = false
            state.message = action.payload.message
            state.user = null
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.message = action.payload.error
            state.loading = false
        })
        .addCase(signupUser.pending, (state) => {
            state.loading = true
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.user = action.payload.user
            state.status = true
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.loading = false
            state.message = action.payload.error
        })
    }
})


export default authSlice.reducer