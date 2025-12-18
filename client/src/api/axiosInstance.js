import axios from "axios";
import conf from "../conf/index";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: conf.appUrl,
    timeout: 70000,
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const original = error.config;
        const status = error.response?.status;
        const code = error.code;
        console.warn("API Error: ", status, code, error.message);

        // Handle Render cold-start
        if(code === "ECONNABORTED" || !error.response){
            toast.loading("Waking up backend server");
            console.log("Retrying after cold start...");
            return axiosInstance(original);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;