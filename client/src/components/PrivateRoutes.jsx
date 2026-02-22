import { Outlet, Navigate } from "react-router-dom";
import { getToken, isExpired } from "../utils/auth.js";

export default function PrivateRoute() {
  const token = getToken();

  if (!token || isExpired()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
