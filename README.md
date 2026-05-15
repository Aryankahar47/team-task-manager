<div align="center">
  
  <h1>🌟 Team Task Manager</h1>

  <p>
    <strong>A powerful, full-stack Kanban and project management solution built for modern teams.</strong>
  </p>

  <h3>
    🚀 <a href="https://team-task-manager-production-0152.up.railway.app" target="_blank"><strong>View Live Demo</strong></a> 🚀
  </h3>

  <p>
    <a href="#features"><img src="https://img.shields.io/badge/Features-Explore-blue?style=for-the-badge&logo=appveyor" alt="Features"></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Tech_Stack-View-orange?style=for-the-badge&logo=react" alt="Tech Stack"></a>
    <a href="#getting-started"><img src="https://img.shields.io/badge/Get_Started-Run-success?style=for-the-badge&logo=rocket" alt="Get Started"></a>
  </p>

  <h3>
    <a href="#about-the-project">About</a>
    <span> | </span>
    <a href="#features">Features</a>
    <span> | </span>
    <a href="#tech-stack">Tech Stack</a>
    <span> | </span>
    <a href="#getting-started">Getting Started</a>
  </h3>
</div>

<br />

## 📖 About The Project

**Team Task Manager** is a comprehensive MERN-stack application designed to streamline team collaboration and boost productivity. With a visually rich Kanban board, real-time interactive charts, and a robust project management system, this tool empowers teams to stay organized and deliver projects on time.

---

## ✨ Features

- 🔐 **Secure Authentication**: Robust user authentication with JSON Web Tokens (JWT) and bcrypt hashing.
- 📋 **Project Workspaces**: Create dedicated workspaces for different projects to keep tasks categorized.
- 🖱️ **Interactive Kanban Boards**: Effortless drag-and-drop task management powered by `@dnd-kit`.
- 📊 **Insightful Dashboards**: Visual data representations using `recharts` to monitor progress and task distribution.
- 🎨 **Modern & Responsive UI**: A beautifully crafted interface using Tailwind CSS and Material UI, fully responsive for all devices.
- ⚡ **RESTful API Architecture**: A clean, structured, and highly scalable Express/MongoDB backend.

---

## 🛠️ Tech Stack

This project leverages modern technologies to ensure high performance and maintainability.

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [MongoDB](https://www.mongodb.com/) (Local installation or a free Atlas URI)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/team-task-manager.git
   cd team-task-manager
   ```

2. **Set up the Backend Server**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Set up the Frontend Client**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

4. **Open the App**
   Navigate to `http://localhost:5173` in your browser. The backend API runs on `http://localhost:5000`.

---

## 🌍 Deployment

### Backend (Railway)

To deploy your backend to Railway:
1. Create a new project on [Railway](https://railway.app/).
2. Connect your GitHub repository.
3. Add your environment variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
4. Railway will automatically detect your Node.js environment and start the app using `npm start`.

### Frontend (Railway)
Your frontend is also deployed on Railway!

To deploy the React Vite frontend to Railway:
1. Create a new service on your Railway project.
2. Connect the same GitHub repository, but set the **Root Directory** to `/frontend`.
3. Railway will automatically detect the build settings (`npm run build`).
4. Add your Environment Variables (e.g., `VITE_API_URL` pointing to your backend Railway URL).
5. Generate a public domain, and your frontend is live!

---

## 📁 Folder Structure

A quick look at the top-level files and directories.

```text
team-task-manager/
├── backend/               # ⚙️ Node/Express API Server
│   ├── controllers/       # Business logic (Auth, Projects, Tasks)
│   ├── middleware/        # JWT Authentication, Error Handling
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # Express Routes
│   └── server.js          # API Entry Point
│
└── frontend/              # 💻 React User Interface
    ├── src/               # React Components & Views
    ├── public/            # Static Assets
    └── vite.config.js     # Vite Config
```

---

<div align="center">
  Made with ❤️ by developers, for developers.
</div>
