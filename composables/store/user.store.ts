import { defineStore, } from "pinia";

const auth = useAuth();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined as User | undefined,
    token: "",
    lessons: [] as Array<Lesson>
  }),
  getters: ({ getMsg: state => state.user }),
  actions: {
    setUser(user: User){
      this.user = user;
    },

    setLesson(lesson: Lesson){
      const interactionsStr = String(lesson.interactions);
      const interactions = JSON.parse(interactionsStr);

      lesson.interactions = interactions;

      this.lessons.push(lesson);
    },

    clearLessons(){
      this.lessons = [];
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
      this.token = ""; navigateTo("/login");
    },
  },

  share: { enable: true },

});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
// }

