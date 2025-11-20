import React, { useEffect, useState } from 'react'
import { Input } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../app/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector((state) => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword({email}))
    }
    useEffect(() => {
        if(status === "succeeded"){
            setEmail("")
            navigate("/")
        }
    }, [navigate, status])
  return (
    <div style={{width: "60%", border: "2px solid black", margin: "20px auto", textAlign: "center"}}>
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
            <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} label="Email: " placeholder="Please fill email" />
            <input type="submit" value={"Submit"} />
        </form>
    </div>
  )
}

export default ForgetPassword