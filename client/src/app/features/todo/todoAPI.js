import axios from "axios";
import conf from "../../../conf";

export const add = async (data) => {
    const response = await axios.post(`${conf.appUrl}/todo`, data, {withCredentials: true});
    console.log(response)
    return response.data
}

export const getAll = async () => {
    const response = await axios.get(`${conf.appUrl}/todo`, {withCredentials: true});
    return response.data
}

export const getOne = async (id) => {
    console.log(id)
    const response = await axios.get(`${conf.appUrl}/todo/${id}`, {withCredentials: true});
    return response.data
}

export const update = async (id, name) => {
    const response = await axios.put(`${conf.appUrl}/todo/${id}`, {name}, {withCredentials:true})
    return response.data
}

export const remove = async (id) => {
    const response = await axios.delete(`${conf.appUrl}/todo/${id}`, {withCredentials: true});
    return response.data
}

export const toggle = async (id) => {
    const response = await axios.put(`${conf.appUrl}/todo/toggle/${id}`, {withCredentials: true})
    return response.data
}

