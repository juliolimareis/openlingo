import { defineStore, } from "pinia";

export const usePlayerStore = defineStore("video", {
  state: () => ({
    player: undefined as any,
    index: 0, //index do vídeo na playlist
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
    setIndex(i: number){
      this.index = i;
      this.player.playVideoAt(this.index);
      this.player.pauseVideo();
      this.isLoader = true;
    },
    playVideo(vInit: number, playbackRate: number){
      this.player.playVideo();
      this.player.setPlaybackRate(playbackRate);
      this.player.seekTo(vInit);
    },
    setLoader(value: boolean){
      this.isLoader = value;
      // console.log("set loader");
    },
    configurePlayList(){
      this.player.loadPlaylist({
        playlist: this.videosIds,
        listType: "user_uploads",
        // startSeconds: props.interactions[$state.index].vInit,
        suggestedQuality: "small"
      });

      this.player.stopVideo();
      this.setLoader(false);
    }
  },

  share: { enable: true },
});