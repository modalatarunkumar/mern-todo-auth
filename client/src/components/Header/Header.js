import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

function Header() {
    const {user} = useSelector((state) => state.auth)
    const isLoggedIn = Boolean(user);
    
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !isLoggedIn
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isLoggedIn
        },
        {
            name: "Admin Dashboard",
            slug: "/admin",
            active: isLoggedIn && user?.role === "ADMIN"
        },
        {
            name: "All Todos",
            slug: "/all-todos",
            active: isLoggedIn
        },
        {
            name: "Add Todo",
            slug: "/add-todo",
            active: isLoggedIn
        }
    ]
  return (
    <header>
        <nav className='bg-white shadow-sm px-6 py-3 flex justify-between items-center'>
            <h1 className="text-xl font-bold text-indigo-600">TodoApp</h1>
            <div className='flex gap-4 flex-col sm:flex-row'>

            {navItems.map((item) => (
                item.active ? (
                    <NavLink 
                    key={item.name} 
                    to={item.slug} 
                    className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-600"}
                    >{item.name}</NavLink>
                    
                ):null
            ))}
                {isLoggedIn && (<LogoutBtn />)}
            </div>
        </nav>
    </header>
  )
}

export default Header