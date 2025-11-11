import React from 'react'
import { TodoForm } from '../../components'
import { useParams } from 'react-router-dom'

function EditTodo() {
    const todo = useParams();
  return (
    <div>
        <TodoForm todo={todo} />
    </div>
  )
}

export default EditTodo