import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication=true}) {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const authStatus = user !== null;
    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
    }, [navigate, authStatus, authentication])
  return (<div>
      {children}
    </div>)

}

export default Protected