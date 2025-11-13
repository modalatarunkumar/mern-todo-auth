import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo';

function AllTodos() {
    const { todos } = useSelector((state) => state.todo);
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