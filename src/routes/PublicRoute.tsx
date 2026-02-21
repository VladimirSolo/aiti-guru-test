import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const { accessToken } = JSON.parse(
    localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
  );

  return accessToken ? <Navigate to="/" replace /> : <Outlet />;
};
