import { isExpired } from "./auth";

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  // auto logout if expired before request
  if (isExpired()) {
    localStorage.clear();
    window.location.href = "/signin";
    return;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  // backend says token invalid/expired
  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/signin";
    return;
  }

  return res;
};
