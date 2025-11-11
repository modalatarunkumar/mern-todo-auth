import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, reset } from './app/features/auth/authSlice';


function App() {
  const {status:authStatus, message:authMessage} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const hasFetchedUser = useRef(false);
  useEffect(()=> {
    toast.dismiss()
      if(authStatus === "succeeded"){
        toast.success(authMessage)
        setTimeout(()=> dispatch(reset()), 1000)
      }
      else if(authStatus === "error"){
        toast.error(authMessage)
      }
  }, [authStatus, authMessage, dispatch])

  useEffect(()=> {
    if(!hasFetchedUser.current){
      dispatch(fetchUser())
      hasFetchedUser.current = true;
    }
  }, [dispatch])
  return (
    <div style={{position: "relative"}}>
      {/* Disable interactions when loading */}
      {authStatus === "loading" && (
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