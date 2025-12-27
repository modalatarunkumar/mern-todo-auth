import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, setError } from '../../app/features/auth/authSlice';

function ResetPassword() {
    const {token} = useParams();
    const [form, setForm] = useState({password:"", confirmPassword:""});
    const navigate = useNavigate();
    const {status} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const formChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      if(form.password.length < 8){
        dispatch(setError("Password should be 8 characters length"));
        return;
      }
      else if(form.password !== form.confirmPassword) {
        dispatch(setError("Password and Confirm Password Should match")); return;
      }
      
      dispatch(resetPassword({token, ...form}))
    }
    useEffect(() => {
      if(status === "succeeded"){
        setForm({password: "", confirmPassword:""})
        navigate("/");
      }
    }, [status, navigate])
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-2xl font-bold'>Reset Password</h1>
            <Input name="password" type="password" label="Password: " placeholder="Please Enter password to update" value={form.password} onChange={formChange} />
            <Input name="confirmPassword" type="password" label="Confirm Password: " placeholder="Confirm password" value={form.confirmPassword} onChange={formChange} />
            <input type='submit' value={"Update"} className='w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition my-1' />
        </form>
    </div>
  )
}

export default ResetPassword;