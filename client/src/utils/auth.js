export const saveAuth = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  // decode expiration
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp * 1000;

  localStorage.setItem("expiry", expiry);
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("expiry");
};

export const isExpired = () => {
  const expiry = localStorage.getItem("expiry");
  if (!expiry) return true;
  return Date.now() > Number(expiry);
};

export const getToken = () => localStorage.getItem("token");