# Getting Started with Backend

This is backend for MERN TODO app.


### 1. Navigate to the server folder

Run the following command

```bash
cd server
```

### 2. Install dependencies

Run the command below to install all necessary packages:

```bash
npm install
```

### 3. Set up Environment variables

create a `.env` file in the `server` folder and add the following(update with your own values):

```bash
MONGO_URI=your_mongo_database_uri
PORT=5000
```

### 4. Run the server locally

To start the backend server, run:

```bash
npm run dev
```
This will start the backend server at `http://localhost:5000`.



### API Endpoints

Some of the key endpoints (example):

| Method     | Endpoint                             | Description                               |
|------------|--------------------------------------|-------------------------------------------|
| **POST**   | `/api/v1/auth/signup`                | Create a new user                         |
| **POST**   | `/api/v1/auth/login`                 | User login                                |
| **GET**    | `/api/v1/auth/profile`               | Get authenticated user profile            |
| **GET**    | `/api/v1/auth/logout`                | Logout user                               |
| **POST**   | `/api/v1/password/forgot`            | Send password reset token via email       |
| **POST**   | `/api/v1/password/reset/:token`      | Reset user password                       |
| **POST**   | `/api/v1/todo`                       | Create a todo for authenticated user      |
| **GET**    | `/api/v1/todo`                       | Get all todos of authenticated user       |
| **GET**    | `/api/v1/todo/:id`                   | Get a specific todo by ID                 |
| **PUT**    | `/api/v1/todo/:id`                   | Update a todo                             |
| **PUT**    | `/api/v1/todo/toggle/:id`            | Toggle todo completion status             |
| **DELETE** | `/api/v1/todo/:id`                   | Soft delete a todo                        |
| **GET**    | `/api/v1/admin/users`                | Get all users (Admin only)                |
| **GET**    | `/api/v1/admin/users-todos`          | Get all users with their todos (Admin)    |
| **GET**    | `/api/v1/admin/user/:id/todos`       | Get todos of a specific user (Admin)      |
| **DELETE** | `/api/v1/admin/delete/:id`           | Delete a user's todo (Admin only)         |
