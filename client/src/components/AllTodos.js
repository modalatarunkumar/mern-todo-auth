import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Todo from './Todo';
import { fetchAllTodos } from '../app/features/todo/todoSlice';

function AllTodos() {
    const { todos } = useSelector((state) => state.todo);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllTodos())
    }, [dispatch])
  return (
    <div style={{width: "60%", border: "2px solid black", margin: "20px auto"}}>
        <h1 style={{textAlign: 'center'}}>All Todos</h1>
        <ul style={{listStyleType:'none', margin:"0px auto"}} >
            {todos &&
            todos.map((todoItem) => (<li key={todoItem._id}><Todo todo={todoItem} /></li>))}
        </ul>
    </div>
  )
}

export default AllTodos