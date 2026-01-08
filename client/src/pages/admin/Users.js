import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getAllUsers, getAUserTodos } from '../../app/features/admin/adminSlice';

function Users() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.admin);
    
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleUserClick = async (userId) => {
      // Fetch todos first (cached in redux)
      await dispatch(getAUserTodos(userId)).unwrap();

      // Navigate to user todos page
      navigate(`/admin/users/${userId}`);

    } 
  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Users</h2>
      
      <div className='over-flow-x-auto bg-white shadow rounded-lg'>
        <table className='min-w-full border-collase'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='text-left px-4 py-2'>S No</th>
              <th className='text-left px-4 py-2'>Name</th>
              <th className='text-left px-4 py-2'>Email</th>
              <th className='text-left px-4 py-2'>Role</th>
              <th className='text-left px-4 py-2'>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className='border-t hover:bg-gray-50'>
                <td className='px-4 py-2'>{index + 1}</td>
                <td className='px-4 py-2 font-medium text-blue-600 cursor-pointer hover:underline'>
                  <button onClick={() => handleUserClick(user._id)} >{user.name}</button></td>
                <td className='px-4 py-2'>{user.email}</td>
                <td className='px-4 py-2'>{user.role}</td>
                <td className='px-4 py-2 text-sm text-gray-500'>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
  )
}

export default Users;