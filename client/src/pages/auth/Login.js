import React, { useEffect, useState } from 'react';
import { loginUser } from '../../app/features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components';

function Login() {
    const [form, setForm] = useState({email: "", password: ""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {status} = useSelector((state) => state.auth)
    const formChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(form.password === "" || form.email === "") {
            alert("Please fill all fields")
            return;
        }
        
        dispatch(loginUser(form))
    }
    
    useEffect(() => {
        if(status === "succeeded"){
            setForm({email: "", password: ""})
            navigate("/")
        }
    },[status, navigate])
  return (
    <div style={{width: "60%", border: "2px solid black", margin: "20px auto", textAlign: "center"}}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
            <Input value={form.email} name='email' placeholder="Please Enter email" onChange={formChange} label="Email:" />
            <Input value={form.password} name="password" placeholder="Enter password" label="Password:" onChange= {formChange} />
            <div>
                <input type='submit' value={"Login"} />
                <input type='button' value={"Reset"} onClick={() => setForm({email: "", password: ""})}/>
            </div>

        </form>
        
    </div>
  )
}

export default Login