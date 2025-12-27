import axios from "axios";
import conf from "../conf/index";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
    baseURL: conf.appUrl,
    timeout: 70000,
    withCredentials: true,
})
// Helper delay function
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

axiosInstance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;
        // Initialize retry count
        originalRequest._retryCount = originalRequest._retryCount || 0;

        const status = error.response?.status;
        const code = error.code;


        console.warn("API Error: ", status, code, error.message);

        // Conditions to Handle Render cold-start
        const shouldRetry = (code === "ECONNABORTED" || !error.response) && originalRequest._retryCount <3;

        if(shouldRetry){
            originalRequest._retryCount +=1;

            if(originalRequest._retryCount === 1){
                toast.loading("Waking up backend server");
            }
            console.log(`Retrying request (${originalRequest._retryCount}/3)...`);
            
            // wait before retrying.
            await wait(1500);

            return axiosInstance(originalRequest);
        }
        // Stop retrying after limit.
        if(originalRequest._retryCount >=3){
            toast.dismiss();
            toast.error("Server not responding. Please try again later.")
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;