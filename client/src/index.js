import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import store from "./app/store.js";
import { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Login, Signup, AddTodo, EditTodo, ForgetPassword, ResetPassword } from "./pages";
import { AllTodos, Protected } from "./components";


const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router >
                <Routes>
                    <Route path="/" element={<App />} >
                    <Route path="login" element={<Protected authentication={false}><Login /></Protected>} />
                    <Route path="signup" element={<Protected authentication={false}><Signup /></Protected>} />
                    <Route path="forget" element={<Protected authentication={false}><ForgetPassword /></Protected>} />
                    <Route path="reset/:token" element={<Protected authentication={false}><ResetPassword /></Protected>} />
                    <Route path="add-todo" element={<Protected authentication ><AddTodo /></Protected>} />
                    <Route path="edit-todo/:todoId" element={<Protected authentication ><EditTodo /></Protected>} />
                    <Route path="all-todos" element={<Protected authentication ><AllTodos /></Protected>} />
                    </Route>
                </Routes>
            </Router>
        <Toaster />
        </Provider>
    </React.StrictMode>

)