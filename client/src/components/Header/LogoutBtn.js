import React from 'react';
import { logoutUser } from '../../app/features/auth/authSlice';
import { useDispatch } from 'react-redux';

function LogoutBtn() {
    const dispatch = useDispatch()
    const logout = async () => {
        dispatch(logoutUser())        
    }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default LogoutBtn