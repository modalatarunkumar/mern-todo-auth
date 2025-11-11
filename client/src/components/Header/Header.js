import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';

function Header() {
    const {user} = useSelector((state) => state.auth)
    const isLoggedIn = user ? true: false;
    let userName = "";
    userName = useSelector((state) => state.auth.user?.name)
    
    const navigate = useNavigate()
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
        <ul style={{listStyleType: 'none', display: "flex", gap: "5px"}}>
            {navItems.map((item) => (
                item.active ? (
                <li key={item.name}>
                    <button 
                    onClick={() => navigate(item.slug)}
                    
                    >{item.name}</button>
                    </li>
                ):null
                ))}
                {isLoggedIn && (<><li><LogoutBtn /></li><li style={{position: 'relative', right: "-50px"}}><b>{userName}</b></li></>)}
        </ul>
    </header>
  )
}

export default Header