export const useLessonRepository = () => {
  const api = useApi();

  function fetch(){
    return api.get<Lesson[]>("/lesson");
  }

  function fetchById(id: string){
    return api.get<Lesson>(`/lesson/${id}`);
  }

  // function dispatch(user: User){
  //   return api.post<UserRegisterResponse>("/user", user);
  // }

  return { fetch, fetchById };
};