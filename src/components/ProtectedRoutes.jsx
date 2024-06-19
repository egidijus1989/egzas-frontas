import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to={"/"} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;