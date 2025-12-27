import React, { useEffect, useState } from 'react'
import Input from "./Input"
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, createTodo, setError } from '../app/features/todo/todoSlice';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
function TodoForm({todo}) {
    const [form, setForm] = useState({name: todo?.name || ""});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector((state) => state.todo)
    const title = todo ? "update" : "create";
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!form.name){
            dispatch(setError("Please provide todo name"));
            return;
        }
        if(todo){
            dispatch(updateTodo({id: todo._id, name: form.name}))
        }
        else{
            dispatch(createTodo(form))
        }
    }
    useEffect(() => {
        if(status === "succeeded"){
            navigate("/all-todos");
        }
    }, [navigate, status])
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>{title} Todo</h1>
        <form onSubmit={handleSubmit}>
        <Input label="Todo Name:" value={form.name} onChange={(e) => setForm({name: e.target.value})} name="name" placeholder="Enter todo to add" />
        <Button type='submit'>{title}</Button>
        </form>
    </div>
  )
}

export default TodoForm