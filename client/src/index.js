import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import store from "./app/store.js";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./router";


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
    </React.StrictMode>

)