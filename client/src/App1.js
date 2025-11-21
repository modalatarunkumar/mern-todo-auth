import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, reset as authReset } from './app/features/auth/authSlice';
import { fetchAllTodos, resetTodo, reset as todoReset } from './app/features/todo/todoSlice';


function App() {
  const {status:authStatus, message:authMessage, user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const hasFetchedUser = useRef(false);
  const isInitialFetch = useRef(true);
  useEffect(()=> {
    toast.dismiss()
    if(authStatus === "succeeded"){
        if(!isInitialFetch.current){
          toast.success(authMessage)
        }
        setTimeout(()=> dispatch(authReset()), 2000)
      }
      else if(authStatus === "error" && !isInitialFetch.current){
        toast.error(authMessage)
      }
  }, [authStatus, authMessage, dispatch])

  useEffect(()=> {
    if(!hasFetchedUser.current){
      dispatch(fetchUser()).finally(()=> {
        isInitialFetch.current = false
      })
      hasFetchedUser.current = true;
    }
  }, [dispatch])
  useEffect(()=> {
    if(user){
      dispatch(fetchAllTodos())
    }
    else{
      dispatch(resetTodo())
    }
  }, [dispatch, user])
  const {status: todoStatus, message: todoMessage} = useSelector((state) => state.todo);
  useEffect(()=> {
    toast.dismiss()
    if(todoStatus === "succeeded" && user){
      toast.success(todoMessage)
      setTimeout(() => dispatch(todoReset()), 1000)
    }
    else if(todoStatus === "rejected" && user){
      toast.error(todoMessage)
    }
  }, [dispatch, todoStatus, todoMessage, user])
  const loading = authStatus === "loading" || todoStatus === "loading";
  return (
    <div style={{position: "relative"}}>
      {/* Disable interactions when loading */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 9999,
            cursor: "not-allowed",
            userSelect: "none",
            pointerEvents: "all", // intercept clicks
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        </div>
      )}
      <Header />
      <Outlet />
    </div>
  )
}

export default App