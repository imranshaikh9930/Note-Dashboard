# Authenticated Notes Dashboard

A full-stack web application that allows users to securely manage their notes with an interactive and responsive UI.

---

## 🚀 Core Features

### 🔐 User Authentication
- Secure **signup**, **login**, and **logout** functionality.
- Passwords are **hashed** and securely stored.
- Input validation and real-time error messages included.

### 🛡️ Protected Dashboard
- Only **authenticated users** can access the dashboard.
- Session management ensures users remain logged in across visits.

### 📝 User Notes Management
- Users can:
  - **Create** new notes.
  - **Edit** existing ones.
  - **Delete** and **view** saved notes.

### 🧠 Session Handling
- Session persistence using cookies or tokens.
- Users stay logged in until logout or session expiry.

---

## 🎨 UI Design Challenge

Built with **Tailwind CSS** and **Framer Motion** for modern animations and styles.

### 📄 Login & Signup Forms
- Smooth transitions and animations.
- Real-time **form validation** and user-friendly error handling.

### 📊 Dashboard Layout
- Responsive layout featuring:
  - **Sidebar** navigation
  - **Top bar** with quick actions
  - Dynamic content area for notes

### 🗂️ Notes List
- Notes displayed as **interactive cards**
- Includes:
  - **Hover effects**
  - **Drag-and-drop reordering** (optional)
  - Framer Motion-powered animations

### 🌙 Dark Mode
- Toggle switch to enable **light/dark themes**

---

## 🎁 Bonus Challenges

- 🔗 **OAuth Login** with Google, GitHub, or other providers for seamless authentication.

---

## 🧱 Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT or sessions with hashed passwords (bcrypt)
- **OAuth**: Google, GitHub (using Passport.js or Firebase Auth)

---

## 📁 Folder Structure (Suggested)
/client └── components/ ├── About.jsx ├── GoogleLogin.jsx ├── Home.jsx ├── Loader.jsx ├── Navbar.jsx ├── Notes.jsx ├── NotesCard.jsx ├── ProtectedRoute.jsx └── Sidebar.jsx

└── Context/ └── AuthContext

└── pages/ ├── Dashboard.jsx └── AuthForm.jsx

├── axiosInstance.js └── App.jsx

/server └── controllers/ ├── userController.js └── notesController.js

└── models/ ├── notes.js └── user.js

└── routes/ ├── userRoutes.js └── notesRoutes.js

└── middlewares/ └── authMiddleware

└── utils/ ├── db.js └── googleClient.js

└── index.js

----------------------------------------------------------------
Deployed Link
https://note-dashboard-frontend-03.onrender.com/





