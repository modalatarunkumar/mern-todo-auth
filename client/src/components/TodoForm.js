import React, { useState } from 'react'
import Input from "./Input"
import { useDispatch } from 'react-redux';
import { updateTodo, createTodo } from '../app/features/todo/todoSlice';
function TodoForm({todo}) {
    const [form, setForm] = useState({name: todo?.name || ""});
    const dispatch = useDispatch();
    const title = todo ? "update" : "create";
    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo){
            dispatch(updateTodo({id: todo._id, name: form.name}))
        }
        else{
            dispatch(createTodo(form))
        }
    }
  return (
    <div style={{width: "60%", border: "2px solid black", margin: "20px auto", textAlign: "center"}}>
        <h1>{title} Todo</h1>
        <form onSubmit={handleSubmit}>
        <Input label="Todo Name:" value={form.name} onChange={(e) => setForm({name: e.target.value})} name="name" placeholder="Enter todo to add" />
        <input type='submit' value={title} />
        </form>
    </div>
  )
}

export default TodoForm