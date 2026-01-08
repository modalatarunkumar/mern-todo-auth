import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Header } from '../components'

function AdminLayout() {
  return (
    <div>
      <Header />
    <div className='min-h-screen flex bg-gray-100'>
        {/* Sidebar */}
        <aside className='w-64 bg-white shadow-md p-4'>
            <h2 className='text-xl font-bold md-6'>Admin</h2>
            
            <nav className='flex flex-col gap-3'>
                <NavLink
                to="/admin/users" 
                className={({isActive}) => isActive? "text-indigo-600 font-semibold": "text-gray-600 hover:text-indigo-600"} >Users</NavLink>
                <NavLink to="/admin/users-todos"
                className={({isActive}) => isActive? "text-indigo-600 font-semibold": "text-gray-600 hover:text-indigo-600"} >Users & Todos</NavLink>
            </nav>
        </aside>
        {/* Main Content */}
        <main className='flex-1 p-6'>
            <Outlet />
        </main>
    </div>
                </div>
  )
}

export default AdminLayout