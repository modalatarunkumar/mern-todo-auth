import React, { useState, useEffect } from 'react'
import { Button, Input } from '../../components'
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
    <div>
        <h1 className='text-center text-2xl font-bold'>Signup</h1>
        <form onSubmit={handleSubmit}>
        <Input name="name" value={form.name} label="Name:" onChange={formChange} placeholder="Please enter name" />
        <Input name="email" type='email' value={form.email} label="Email" onChange={formChange} placeholder="Please fill Email id" />
        <Input name="password" type="password" value={form.password} label="Password" onChange={formChange} placeholder="Please enter Password" />
        <div>
            <Button type='submit'>Signup</Button>
            <Button onClick={() => setForm({name: "", email: "", password:""})}>Reset</Button>
        </div>
        </form>
    </div>
  )
}

export default Signup