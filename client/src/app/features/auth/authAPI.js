// This file will only handle axois requests.
import axios from "../../../api/axiosInstance";

// All functions return raw data or throw errors

export const login = async (data) => {
    const response = await axios.post(`/auth/login`, data);
    return response;
}

export const logout = async () => {
    const response = await axios.get(`/auth/logout`);
    return response;
}

export const signup = async (data) => {
    const response = await axios.post(`/auth/signup`, data);
    return response;
}

export const fetchProfile = async () => {
    const response = await axios.get(`/auth/profile`);
    return response;
}

export const forget = async (data) => {
    const response = await axios.post(`/auth/password/forgot`, data)
    return response;
}

export const resett = async (token, data) => {
    const response = await axios.post(`/auth/password/reset/${token}`, data)
    return response;
}