import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const { user } = useSelector((state) => state.auth);
  return (
    <div>{user? <p>Welcome <span className='font-bold'>{user.name}</span></p>: ""}</div>
  )
}

export default Home;