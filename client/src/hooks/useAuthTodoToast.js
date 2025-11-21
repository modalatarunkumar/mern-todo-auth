import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchUser, reset as authReset } from "../app/features/auth/authSlice";
import { fetchAllTodos, resetTodo, reset as todoReset } from "../app/features/todo/todoSlice";


export const useAuthTodoToast = () => {
    const dispatch = useDispatch();
    const {status: authStatus, message: authMessage, user} = useSelector((state) => state.auth);
    const {status: todoStatus, message: todoMessage} = useSelector((state) => state.todo);
    const delay = 2000;
    // Only fetch user once
    const hasFetchedUser = useRef(false);
    const isInitialFetch = useRef(true);

    useEffect(() => {
    if (!hasFetchedUser.current) {
      dispatch(fetchUser()).finally(() => {
        isInitialFetch.current = false;
      });
      hasFetchedUser.current = true;
    }
  }, [dispatch]);

  // Auth toast
  useEffect(() => {
    if (isInitialFetch.current) {
        setTimeout(() => dispatch(authReset()), delay);
        return; // Skip toast on first fetch
    }
    toast.dismiss();
    if (authStatus === "succeeded"){
        if(authMessage) toast.success(authMessage);
        setTimeout(() => dispatch(authReset()), delay);
    }
    if (authStatus === "error"){
        if(authMessage) toast.error(authMessage);
        setTimeout(() => dispatch(authReset()), delay);
    }
  }, [authStatus, authMessage, dispatch]);

  // Fetch todos if user exists
  useEffect(() => {
    if (user) dispatch(fetchAllTodos());
    else dispatch(resetTodo());
  }, [dispatch, user]);

  // Todo toast
  useEffect(() => {
    if (!user) return;
    toast.dismiss();
    if (todoStatus === "succeeded"){
        if(todoMessage) toast.success(todoMessage);
        setTimeout(() => dispatch(todoReset()), delay);
    }
    if (todoStatus === "rejected"){
        if(todoMessage) toast.error(todoMessage);
        setTimeout(() => dispatch(todoReset()), delay);
    }
  }, [todoStatus, todoMessage, user, dispatch]);

  // Return loading state
  const loading = authStatus === "loading" || todoStatus === "loading";
  return loading;

}

