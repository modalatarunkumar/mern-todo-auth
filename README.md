# ✅ MERN TODO App

A full-stack Todo Application built with the **MERN stack (MongoDB, Express, React, Node.js)** featuring authentication, role-based access control, and admin management.

This app allows users to manage their todos securely, while admins can monitor users and their tasks — demonstrating **real-world full-stack application architecture**.

---

## 🤔 Why This Project

I built this project to gain hands-on experience with **real-world authentication workflows, role-based access control, and state management** in a full-stack MERN application.

Unlike basic CRUD apps, this project focuses on **secure user authentication using JWT and httpOnly cookies**, protected routes, and **admin-level access** to manage users and their data.

The goal was to simulate a **production-like application** where multiple user roles exist, data access is restricted, and frontend and backend are tightly integrated.

---

## ✨ Features

* 🔐 User authentication using **JWT with httpOnly cookies**
* 👤 Role-based access control (User & Admin)
* ➕ Create, edit, delete todos
* ✅ Toggle todo completion status
* 🔍 Search, filter (All / Completed / Pending) todos
* 🧑‍💼 Admin dashboard to manage users & todos
* 🔑 Forgot & Reset password flow with token expiry
* ⚡ Redux Toolkit for state management
* 🌐 RESTful APIs with Axios integration
* 🔄 Automatic backend retry handling (cold start support)
* 🧰 Modular and scalable folder structure

---

## ⚙️ Tech Stack

**Frontend:**
React, Redux Toolkit, React Router, Axios, Tailwind CSS, React Hot Toast

**Backend:**
Node.js, Express.js, MongoDB (Mongoose), JWT Authentication

**Deployment:**

* Frontend → [Vercel](https://vercel.com/)

* Backend → [Render](https://render.com/)

* Database → MongoDB Atlas

**Tools:**
dotenv, cors, nodemon, bcrypt, cookie-parser

---
## 🧠 Project Structure

```
mern-todo-auth/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── conf/
│   │   ├── api/
│   │   ├── app/            # Redux store & slices
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── hooks/
│   │   └── App.js
│   └── package.json
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── service/
│   │   ├── utils/
│   │   └── app.js
│   └── server.js
│
└── README.md
```

---

## 🚀 Getting Started

### 🧩 Prerequisites

Make sure you have installed:

* Node.js (v16+)

* npm or yarn

* MongoDB Atlas account (for cloud DB)

---

### 🛠️ Setup

Follow instructions inside each `README.md` present in **client** and **server** folders.

---

## 🌍 Deployment

| Service  | Platform | Live URL                                                                 |
| -------- | -------- | ------------------------------------------------------------------------ |
| Frontend | Vercel   | [https://mern-todo-auth.vercel.app](https://mern-todo-auth.vercel.app)     |
| Backend  | Render   | [https://mern-todo-auth-m5x2.onrender.com](https://mern-todo-auth-m5x2.onrender.com) |

Frontend and backend are connected using **CORS and secure cookies**.

---

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat\&logo=redux\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat\&logo=mongodb\&logoColor=white)

---
