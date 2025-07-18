// src/App.js

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
// import Dashboard from './components/Dashboard/Dashboard';
// import TaskPage from './components/Tasks/TaskPage';
// import RegisterPage from './components/Login/RegisterPage';
// import PrivateRoute from './components/Protected/PrivateRoute';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import PrivateRoute from './components/Protected/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path='/' element = {<Home/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['superadmin', 'staff']}>
              {/* <Dashboard /> */} HELLO
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/task/:projectId"
          element={
            <PrivateRoute allowedRoles={['superadmin', 'staff']}>
              <TaskPage />
            </PrivateRoute>
          }
        /> */}

        {/* Optional extra role-based routes */}
        {/* <Route
          path="/admin-panel"
          element={
            <PrivateRoute allowedRoles={['superadmin']}>
              <div>Super Admin Panel</div>
            </PrivateRoute>
          }
        /> */}

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
