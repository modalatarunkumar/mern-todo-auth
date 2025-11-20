import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../app/features/auth/authSlice";
import { fetchAllTodos, resetTodo } from "../app/features/todo/todoSlice";


export const useFetchUserAndTodos = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const hasFetchedUser = useRef(false);

    useEffect(() => {
        if(!hasFetchedUser.current){
            dispatch(fetchUser()).finally(() => {
                hasFetchedUser.current = true;
            })
        }
    }, [dispatch]);

    useEffect(() => {
        if(user){
            dispatch(fetchAllTodos());
        }
        else{
            dispatch(resetTodo());
        }
    }, [dispatch, user]);



}