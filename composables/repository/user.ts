import { useApi, } from "../api";
import { UserLoginDTO, } from "~/server/dtos/user.Login";

export const useUser = () => {
  const api = useApi();

  function auth(userLogin: UserLoginDTO){
    return api.post<{token: string, user: User}>("/auth", userLogin);
  }

  function dispatch(user: User){
    return api.post<UserRegisterResponse>("/user", user);
  }

  return { auth, dispatch };
};