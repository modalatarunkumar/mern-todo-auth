import React from 'react';
import { TodoForm } from '../../components';
import { useParams } from 'react-router-dom';
import { fetchATodo } from '../../app/features/todo/todoSlice';
import { useDispatch } from 'react-redux';


function EditTodo() {
    const {todoId:id} = useParams();
    const dispatch = useDispatch()
    
    const todo = dispatch(fetchATodo(id))
    console.log("Todo", todo)
  return (
    <div>
        <TodoForm todo={todo} />
    </div>
  )
}

export default EditTodo