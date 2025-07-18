// src/components/Protected/PrivateRoute.js
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, allowedRoles }) {
  const token = sessionStorage.getItem('token');
  const userRole = sessionStorage.getItem('role'); // stored after login

  // if (!token) return <Navigate to={"/login"} />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;

  return children;
}

export default PrivateRoute;
