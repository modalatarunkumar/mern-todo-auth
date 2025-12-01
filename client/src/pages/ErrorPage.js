import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    
    let title = "404 - Page not found";
    let message = "The page you are looking for does not exist.";

    if(error){

        if(isRouteErrorResponse(error)){
            // React Router error (404, loader/action error, etc.)
            title = `${error.status} - ${error.statusText}`;
            message = error.data?.message || error.message;
        }
        else if(error instanceof Error){
            // Normal JS error
            message = error.message;
        }
        
    }
  return (
    <div style={{padding: "20px"}}>
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
  )
}

export default ErrorPage;