import axios from "../../../api/axiosInstance";

export const fetchAllUsers = async () => {
    const response = await axios.get("/admin/users");
    return response;
}

export const fetchAllUsersWithTodos = async () => {
    const response = await axios.get("/admin/users-todos");
    return response;
}
export const fetchAUserTodos = async (id) => {
    const response = await axios.get(`/admin/user/${id}/todos`);
    return response;
}
export const adminDeleteTodo = async (id) => {
    const response = await axios.delete(`/admin/delete/${id}`);
    return response;
}