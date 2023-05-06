export function useAuth(){
  const isLogin = () => !!localStorage.getItem("token");

  const getToken = () => localStorage.getItem("token");

  const setToken = (token: string) => localStorage.setItem("token", token);

  const logout = () => localStorage.removeItem("token");

  return { isLogin, getToken, setToken, logout };
}