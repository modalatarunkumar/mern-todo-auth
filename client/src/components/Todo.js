import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleTodo, deleteTodo } from '../app/features/todo/todoSlice'

function Todo({todo}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <div style={{border:"2px solid black", width: "80%",padding:"10px", margin: "10px", display:'flex', flexWrap:"wrap", justifyContent: "space-between"}}>
        <div style={{display: 'flex', gap: "20px"}}>
        <input type='checkbox' checked={todo.isCompleted} onChange={()=> dispatch(toggleTodo(todo._id))}/>
        <strong>{todo.name}</strong>
        </div>
        <div style={{display: 'flex', gap: "20px"}}>
            <button onClick={() => navigate(`/edit-todo/${todo._id}`)}>Edit</button><button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
        </div>
    </div>
  )
}

export default Todo