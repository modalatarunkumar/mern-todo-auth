import axios from "../../../api/axiosInstance";

export const add = async (data) => {
    const response = await axios.post(`/todo`, data);
    return response;
}

export const getAll = async () => {
    const response = await axios.get(`/todo`);
    return response;
}

export const getOne = async (id) => {
    const response = await axios.get(`/todo/${id}`);
    return response;
}

export const update = async (id, name) => {
    const response = await axios.put(`/todo/${id}`, {name});
    return response;
}

export const remove = async (id) => {
    const response = await axios.delete(`/todo/${id}`);
    return response;
}

export const toggle = async (id) => {
    const response = await axios.put(`/todo/toggle/${id}`, {});
    return response;
}

