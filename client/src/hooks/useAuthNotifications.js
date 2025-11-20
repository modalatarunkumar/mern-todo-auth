import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reset as authReset } from "../app/features/auth/authSlice";


export const useAuthNotifications = () => {
    const {status, message} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isInitialFetch = useRef(true);

    useEffect(() => {
        toast.dismiss();

        if(status === "succeeded"){
            if(!isInitialFetch.current){
                toast.success(message);
            }
            setTimeout(() => dispatch(authReset()), 2000);
        }
        else if(status === "error" && !isInitialFetch.current){
            toast.error(message);
        }
        isInitialFetch.current = false;
    }, [status, message, dispatch]);

}