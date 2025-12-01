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
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 9999,
            cursor: "not-allowed",
            userSelect: "none",
            pointerEvents: "all", // intercept clicks
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Loading...
          </div>
        </div>
      )}
      <Header />
      <Outlet />
    </div>
  )
}

export default App