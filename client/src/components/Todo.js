import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleTodo, deleteTodo } from '../app/features/todo/todoSlice'

function Todo({todo}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  return (
    <p style={{border:"2px solid black", width: "80%",padding:"10px", margin: "10px"}}>
        <input type='checkbox' checked={todo.isCompleted} onChange={()=> dispatch(toggleTodo(todo._id))}/>
        {todo.name}
        <>
            <button onClick={() => navigate(`/edit-todo/${todo._id}`)}>Edit</button><button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
        </>
    </p>
  )
}

export default Todo