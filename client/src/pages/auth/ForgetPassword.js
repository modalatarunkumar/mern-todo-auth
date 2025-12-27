import React, { useEffect, useState } from 'react'
import { Button, Input } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, setError } from '../../app/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector((state) => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email){
            dispatch(setError("Please enter email id"));
            return;
        }
        dispatch(forgetPassword({email}))
    }
    useEffect(() => {
        if(status === "succeeded"){
            setEmail("")
            navigate("/")
        }
    }, [navigate, status])
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>Forget Password</h1>
        <form onSubmit={handleSubmit}>
            <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email: " placeholder="Please fill email" />
            <Button type='submit'>Submit</Button>
        </form>
    </div>
  )
}

export default ForgetPassword