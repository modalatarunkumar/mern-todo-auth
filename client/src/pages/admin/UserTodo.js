import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAUserTodos, deleteTodoByAdmin } from '../../app/features/admin/adminSlice';

function UserTodo() {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const userTodosState = useSelector(
        (state) => state.admin.todosByUserId[userId]
    );
    console.log(userTodosState)
    useEffect(() => {
        if(!userTodosState){
            dispatch(getAUserTodos(userId));
        }
    }, [dispatch, userId, userTodosState])
  return (
 <div>
      <h2 className="text-xl font-bold mb-4">User Todos</h2>

      {userTodosState?.length === 0 ? ( 
        <p>No todos found</p>
      ) : 
      (
      <div className='overflow-x-auto bg-white shadow rounded-lg'>
        <table className='min-w-full border-collapse'>
          <thead className='bg-gray-100'>
            <tr>
            <th className='px-4 py-2 text-left'>S No</th>
              <th className='px-4 py-2 text-left'>Todo</th>
              <th className='px-4 py-2 text-left'>Status</th>
              <th className='px-4 py-2 text-left'>Created On</th>
              <th className='px-4 py-2 text-left'>Updated On</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userTodosState?.map((todo, index) => 
            (
                <tr key={todo._id} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-2 font-medium'>
                    {index + 1}
                  </td>
                  <td className='px-4 py-2'>{todo.name}</td>
                  <td className='px-4 py-2'>{todo.isCompleted ? "Completed": "Pending"}</td>
                  <td className='px-4 py-2'>{new Date(todo.createdAt).toLocaleString()}</td>
                  <td className='px-4 py-2'>{new Date(todo.updatedAt).toLocaleString()}</td>
                  <td className='px-4 py-2 text-right'>
                    <button onClick={() => {
                      if(window.confirm("Delete this todo?")){
                        dispatch(deleteTodoByAdmin(todo._id));
                      }
                    }} className='text-red-600 hover:underline'>Delete</button>
                  </td>
                </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>  )
}

export default UserTodo