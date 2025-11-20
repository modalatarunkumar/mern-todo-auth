// This file will only handle axois requests.
import axios from "axios";
import conf from "../../../conf";

// All functions return raw data or throw errors

export const login = async (data) => {
    const response = await axios.post(`${conf.appUrl}/auth/login`, data, {withCredentials: true});
    return response.data;
}

export const logout = async () => {
    const response = await axios.get(`${conf.appUrl}/auth/logout`, {withCredentials: true});
    return response.data;
}

export const signup = async (data) => {
    const response = await axios.post(`${conf.appUrl}/auth/signup`, data, {withCredentials: true});
    return response.data;
}

export const fetchProfile = async () => {
    const response = await axios.get(`${conf.appUrl}/auth/profile`, {withCredentials: true});
    return response.data
}

export const forget = async (data) => {
    const response = await axios.post(`${conf.appUrl}/auth/password/forgot`, data, {withCredentials:true})
    return response.data;
}

export const resett = async (token, data) => {
    const response = await axios.post(`${conf.appUrl}/auth/password/reset/${token}`, data, {withCredentials: true})
    return response.data;
}