import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminProtected, AllTodos, Home, Protected } from "../components";
import { AddTodo, EditTodo, ErrorPage, ForgetPassword, Login, ResetPassword, Signup, Users, UsersTodos } from "../pages";
import AdminLayout from "../layout/AdminLayout";
import UserTodo from "../pages/admin/UserTodo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:"/",
                element: <Home />,
            },
            {
                path: "login",
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "signup",
                element: (
                    <Protected authentication={false}>
                        <Signup />
                    </Protected>
                ),
            },
            {
                path: "forget",
                element: (
                    <Protected authentication={false}>
                        <ForgetPassword />
                    </Protected>
                ),
            },
            {
                path: "reset/:token",
                element: (
                    <Protected authentication={false}>
                        <ResetPassword />
                    </Protected>
                ),
            },
            {
                path: "add-todo",
                element: (
                    <Protected authentication >
                        <AddTodo />
                    </Protected>
                ),
            },
            {
                path: "edit-todo/:todoId",
                element: (
                    <Protected authentication>
                        <EditTodo />
                    </Protected>
                ),
            },
            {
                path: "all-todos",
                element: (
                    <Protected authentication>
                        <AllTodos />
                    </Protected>
                ),
            }
        ]
    },
    {
    path:"/admin",
        element: (
            <AdminProtected>
                <AdminLayout />
            </AdminProtected>
        ),
        children: [{
            path: "users",
            element: <Users />
        },
        {
            path: "users-todos",
            element: <UsersTodos />
        },
        {
            path: "users/:userId",
            element: <UserTodo />
        }
    ]
    },
    {
        path: "*",
        element: <ErrorPage />,
    }

])

export default router;