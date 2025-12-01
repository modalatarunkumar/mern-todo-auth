import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AllTodos, Protected } from "../components";
import { AddTodo, EditTodo, ErrorPage, ForgetPassword, Login, ResetPassword, Signup } from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
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
        path: "*",
        element: <ErrorPage />,
    }

])

export default router;