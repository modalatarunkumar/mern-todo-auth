import React from 'react';
import { TodoForm } from '../../components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function EditTodo() {
    const {todoId} = useParams();
    const {todos} = useSelector((state) => state.todo)
    const index = todos.findIndex(todoItem => todoItem._id === todoId)
    const todo = todos[index]

  return (
    <div>
        <TodoForm todo={todo} />
    </div>
  )
}

export default EditTodo