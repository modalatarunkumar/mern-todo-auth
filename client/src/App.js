import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, reset } from './app/features/auth/authSlice';


function App() {
  const {status:authStatus, message:authMessage} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(()=> {
    toast.dismiss()
    if(authStatus === "succeeded"){
      toast.success(authMessage)
      setTimeout(()=> dispatch(reset()), 1000)
    }
    else if(authStatus === "error"){
      toast.error(authMessage)
    }
    else if(authStatus === "loading"){
      toast.loading("Loading...")
    }
  }, [authStatus, authMessage, dispatch])

  useEffect(()=> {
    dispatch(fetchUser())
  }, [dispatch])
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App