
# 🎓 Student Management System - Frontend

This is the **frontend application** of the Student Management System built using **React.js**, **Tailwind CSS**, and **Material UI (MUI)**. It provides an interactive interface for Admins and Staff to manage students, staff, and permissions securely.

---

## ⚙️ Installation & Run Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jithinbinoy2000/Student_Management_System_Frontend.git
cd Student_Management_System_Frontend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the React App

```bash
npm run dev
```

The app will start at: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Features

* 🔐 Secure login for Admin and Staff
* 🧑‍💼 Staff management with permission-based access
* 🎓 Student CRUD operations
* 🌓 Dark-themed responsive UI
* 🧠 Role-based route and feature control
* 🔔 Real-time toast notifications using MUI
* 📱 Mobile-friendly layout

---

## 🗂️ Project Structure

```
Student_Management_System_Frontend/
│
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components (e.g. Modals, Table)
│   ├── context/            # React contexts (Toast, Auth)
│   ├── pages/              # Main route views (Dashboard, Login)
│   ├── services/           # API service files (Axios logic)
│   └── App.jsx             # Main app entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔐 Authentication

* Uses **JWT tokens** stored in `sessionStorage`
* Guards routes based on user login and role
* Permissions passed from backend and enforced in UI logic

---

## 📡 Backend Integration

This frontend communicates with the [Student Management System Backend](https://github.com/jithinbinoy2000/Student_Management_System_Backend.git).

Before running the frontend:

1. Make sure the backend is running
2. Seed the roles by executing:

```bash
node config/seedRoles.js
```

