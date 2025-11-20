import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { reset as todoReset } from "../app/features/todo/todoSlice";


export const useTodoNotifications = () => {
    const { status, message } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        toast.dismiss();
        if(status === "succeeded" && user){
            toast.success(message);
            setTimeout(() => dispatch(todoReset()), 2000);
        }
        else if(status === "error" && user){
            toast.error(message);
        }
    }, [status, message, dispatch, user]);
}