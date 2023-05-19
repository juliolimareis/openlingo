import { defineStore, } from "pinia";

const auth = useAuth();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined as User | undefined,
    token: "",
    lesson: undefined as Lesson | undefined
  }),
  getters: ({
    getMsg: state => state.user,
    getLesson: state => state.lesson
  }),
  actions: {
    setUser(user: User){
      this.user = user;
    },
    setLesson(lesson: Lesson){
      const interactionsStr = String(lesson.interactions);
      const interactions = JSON.parse(interactionsStr);

      lesson.interactions = interactions;

      this.lesson = lesson;
    },
    isLogin(){
      return !!this.token;
    },
    getToken() {
      return this.token;
    },
    setToken(token: string) {
      auth.setToken(token);
      this.token = token;
    },
    logout(){
      auth.removeToken();
      this.token = "";
      navigateTo("/login");
    },
  },

  share: { enable: true },
  persist: true

});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
// }

