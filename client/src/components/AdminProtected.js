import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminProtected({children}) {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    useEffect(()=>{

        if(!user){
            return navigate("/login")
        }
        if(user?.role !== "ADMIN"){
            return navigate("/")
        }
    }, [user, navigate])
  return children
}

export default AdminProtected;