import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import { useAuthTodoToast } from './hooks/useAuthTodoToast';

function App() {

  const loading = useAuthTodoToast();
  return (
    <div style={{position: "relative"}}>
      {/* Disable interactions when loading */}
      {loading && (
        <div
          className='fixed inset-0 bg-white/50 z-[9999] cursor-not-allowed select-none pointer-events-auto'
        >
          <div 
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold'
          >
            Loading...
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
            <Header />
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default App