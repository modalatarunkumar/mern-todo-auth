import React, { useEffect, useState } from 'react';
import { loginUser} from './authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

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
            <div>
                <label htmlFor='email' >Email: </label>
                <input placeholder='Please enter email id' onChange={formChange} id='email' name='email' value={form.email}/>
            </div>
            <div>
                <label htmlFor='password' >Password: </label>
                <input placeholder='Enter password' id='password' name='password' value={form.password} onChange={formChange}/>
            </div>
            <div>
                <input type='submit' value={"Login"} />
                <input type='button' value={"Reset"} onClick={() => setForm({email: "", password: ""})}/>
            </div>

        </form>
        
    </div>
  )
}

export default Login