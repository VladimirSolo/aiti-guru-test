import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { accessToken } = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
  );

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
