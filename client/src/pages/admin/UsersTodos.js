import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodoByAdmin, getAllUsersWithTodos } from '../../app/features/admin/adminSlice';

function UsersTodos() {
  const dispatch = useDispatch();
  const { users, message } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getAllUsersWithTodos());
  }, [dispatch]);
  return (
    <div>
      
      <h2 className='text-xl font-bold mb-4'>Users & Todos</h2>
      <p className='text-xl font-bold text-center mb-4'>{message}</p>
      <div className='overflow-x-auto bg-white shadow rounded-lg'>
        <table className='min-w-full border-collapse'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-2 text-left'>User</th>
              <th className='px-4 py-2 text-left'>Todo</th>
              <th className='px-4 py-2 text-left'>Status</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => 
            user?.todos?.length === 0 ? (
              <tr key={user._id} className='border-t'>
                <td className='px-4 py-2 font-medium'>{user.name}</td>
                <td colSpan="3" className='px-4 py-2 text-gray-500'>No todos</td>
              </tr>
            ): (
              user?.todos?.map((todo,index) => (
                <tr key={todo._id} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-2 font-medium'>
                    {index === 0 && user.name}
                  </td>
                  <td className='px-4 py-2'>{todo.name}</td>
                  <td className='px-4 py-2'>{todo.isCompleted ? "Completed": "Pending"}</td>
                  <td className='px-4 py-2 text-right'>
                    <button onClick={() => {
                      if(window.confirm("Delete this todo?")){
                        dispatch(deleteTodoByAdmin(todo._id));
                      }
                    }} className='text-red-600 hover:underline'>Delete</button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTodos