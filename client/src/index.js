import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from "./app/store.js";
import { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login, Signup, AddTodo, EditTodo } from "./pages";


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router >
                <Routes>
                    <Route path="/" element={<App />} >
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="add-todo" element={<AddTodo />} />
                    <Route path="edit-todo" element={<EditTodo />} />
                    </Route>
                </Routes>
            </Router>
        <Toaster />
        </Provider>
    </React.StrictMode>

)