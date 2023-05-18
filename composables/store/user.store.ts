import { defineStore, } from "pinia";

const auth = useAuth();

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined as User | undefined,
    token: "",
    lessons: [] as Array<Lesson>
  }),
  getters: ({
    getMsg: state => state.user,
    getLessons: state => state.lessons
  }),
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
      this.token = "";
      navigateTo("/login");
    },
  },

  share: { enable: true },
  persist: true

});

export const useVideoStore = defineStore("video", {
  state: () => ({
    player: undefined as any,
    index: 0,
    isLoader: true,
  }),
  getters: ({ getVideo: state => state.player }),
  actions: {
    setPlayer(video: any){
      this.player = video;
    },
    setIndex(i: number){
      this.index = i;
      this.player.playVideoAt(this.index);
      this.player.pauseVideo();
      this.isLoader = true;
    },
    playVideo(){
      this.player.playVideo();
    },
    setLoader(value: boolean){
      this.isLoader = value;
      console.log("set loader");
    }
  },

  share: { enable: true },
});

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
// }

