export function useAuth(){
  const isLogin = () => !!localStorage.getItem("token");

  const getToken = () => localStorage.getItem("token");

  const setToken = (token: string) => localStorage.setItem("token", token);

  const removeToken = () => localStorage.removeItem("token");

  return { isLogin, getToken, setToken, removeToken };
}