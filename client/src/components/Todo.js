import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleTodo, deleteTodo } from '../app/features/todo/todoSlice'

function highlightText(text, search){
  if(!search) return text;

  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => 
  part.toLowerCase() === search.toLowerCase() ? (<mark 
    key={index} 
    className='bg-yellow-300 px-1 rounded'
    >{part}</mark>)
      :
      (part));
}

function Todo({todo, search}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition'>
        <div className='flex items-center gap-3'>
        <input type='checkbox' checked={todo.isCompleted} onChange={()=> dispatch(toggleTodo(todo._id))} className='h-5 w-5 text-indigo-600'/>
        <span className={todo.isCompleted? 'line-through text-gray-400':'text-gray-800'}>{highlightText(todo.name, search)}</span>
        </div>
        <div className='flex gap-2'>
            <button onClick={() => navigate(`/edit-todo/${todo._id}`)} className='text-blue-500 hover:underline'>Edit</button>
            <button onClick={() => dispatch(deleteTodo(todo._id))} className='text-red-500 hover:underline'>Delete</button>
        </div>
    </div>
  )
}

export default Todo