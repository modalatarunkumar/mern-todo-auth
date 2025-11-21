import React, { useState, useEffect } from 'react'
import { Input } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, setError } from '../../app/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [form, setForm] = useState({name: "", email: "",password:""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status } = useSelector((state) => state.auth)
    const formChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.name==="" || form.password === ""||form.email === ""){
            dispatch(setError("Please fill all fields"));
            return;
        }
        else if(form.password.length < 8){
            dispatch(setError("Password should be 8 characters length"))
            return;
        }
        dispatch(signupUser(form))
    }
    useEffect(() => {
            if(status === "succeeded"){
                setForm({name: "", email: "", password: ""})
                navigate("/")
            }
        },[status, navigate])
  return (
    <div style={{width: "60%", border: "2px solid black", margin: "20px auto", textAlign: "center"}}>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
        <Input name="name" value={form.name} label="Name:" onChange={formChange} placeholder="Please enter name" />
        <Input name="email" type='email' value={form.email} label="Email" onChange={formChange} placeholder="Please fill Email id" />
        <Input name="password" type="password" value={form.password} label="Password" onChange={formChange} placeholder="Please enter Password" />
        <div>
            <input type='submit' value={"Signup"} />
            <input type='button' value="reset" onClick={() => setForm({name: "", email: "", password:""})} />
        </div>
        </form>
    </div>
  )
}

export default Signup