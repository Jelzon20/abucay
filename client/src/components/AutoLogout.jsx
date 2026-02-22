import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, isExpired } from "../utils/auth";

export default function AutoLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem("expiry");
    if (!expiry) return;

    const timeout = Number(expiry) - Date.now();

    const logout = () => {
      clearAuth();
      navigate("/");
    };

    if (timeout <= 0) logout();
    else setTimeout(logout, timeout);
  }, [navigate]);

  return null;
}
