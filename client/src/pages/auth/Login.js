import React, { useEffect, useState } from 'react';
import { loginUser, setError } from '../../app/features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';

function Login() {
    const [form, setForm] = useState({email: "", password: ""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {status, user} = useSelector((state) => state.auth)
    const formChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(form.password === "" || form.email === "") {
            dispatch(setError("Please fill all fields"))
            return;
        }
        else if(form.password.length < 8){
            dispatch(setError("Password should be 8 characters length"))
            return;
        }
        
        dispatch(loginUser(form))
    }
    
    useEffect(() => {
        if(status === "succeeded" && user){
            setForm({email: "", password: ""})
            navigate("/")
        }
    },[status, user, navigate])
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>Login</h1>
        <form onSubmit={handleSubmit} >
            <Input value={form.email} name='email' placeholder="Please Enter email" onChange={formChange} label="Email:" />
            <Input value={form.password} type="password" name="password" placeholder="Enter password" label="Password:" onChange= {formChange} />
            <div>
                <Button type='submit'>Login</Button>
                <Button onClick={() => setForm({email: "", password: ""})}>Reset</Button>
            </div>
            <div><button onClick={() => navigate("/forget")} disabled={process.env.NODE_ENV === "production"} className='text-indigo-600'>Forgot Password</button></div>
        </form>
        
    </div>
  )
}

export default Login