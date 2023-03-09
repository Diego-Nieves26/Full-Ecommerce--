import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const logged = localStorage.getItem("token");
  if (logged) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
