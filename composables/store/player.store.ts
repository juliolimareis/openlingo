import { defineStore, } from "pinia";

export const usePlayerStore = defineStore("video", {
  state: () => ({
    player: undefined as any,
    isLoader: true,
    videosIds: [] as string[],
  }),
  getters: ({ getVideo: state => state.player }),
  actions: {
    addVideoId(id: string){
      this.videosIds.push(id);
    },
    setPlayer(video: any){
      this.player = video;
    },
    playVideo(index: number, playbackRate: number){
      this.player.playVideoAt(index);

      this.player.setPlaybackRate(playbackRate);
      this.setLoader(true);

      this.player.unMute();
    },
    setLoader(value: boolean){
      this.isLoader = value;
    },
    configurePlayList(startSeconds: number){
      this.player.mute();

      this.player.loadPlaylist({
        playlist: this.videosIds,
        listType: "user_uploads",
        startSeconds,
        suggestedQuality: "small"
      });

      this.player.stopVideo();
      this.setLoader(false);
    },
    clearIds(){
      this.videosIds = [];
    }
  },

  share: { enable: true },
});