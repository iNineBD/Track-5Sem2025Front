export const useUser = () => {
  const getToken = () => localStorage.getItem("authToken");

  const getUser = () => {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  };

  const clearUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const isLoggedIn = () => !!getToken();

  const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  return {
    getToken,
    getUser,
    clearUser,
    isLoggedIn,
    isTokenExpired,
  };
};
