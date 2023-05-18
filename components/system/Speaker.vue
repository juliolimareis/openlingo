<template>
  <div :id="id" class="absolute top-[-500px] invisible z-[-10]" aria-hidden></div>
  <div class="mt-10">
    <span v-if="!$state.isLoader" class="flex justify-center">
      <SpeakerWaveIcon @click="play()" class="cursor-pointer w-24 mr-6 text-primary-500" />
      <TruckIcon @click="play(0.5)" class="cursor-pointer w-14 mt-5 text-primary-500" />
    </span>

    <Loader v-else class="m-auto" size="lg" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

import { SpeakerWaveIcon, TruckIcon, } from "@heroicons/vue/24/solid";
import { v4 as uuidv4, } from "uuid";

const props = defineProps<{
  interactions: Interaction[]
}>();

const id = uuidv4();
const { $state, playVideo, setPlayer, setLoader } = useVideoStore();
const isPlay = ref(false);
const slowRateValue = ref(1);
const videoIds = ref(props.interactions.filter(n => n.videoId).map((n) => n.videoId));

// https://developers.google.com/youtube/iframe_api_reference?hl=pt-br
function onYouTubeIframeAPIReady() {
  // @ts-ignore
  setPlayer(new YT.Player(id, {
    height: "450",
    width: "450",
    videoId: videoIds.value[0],
    suggestedQuality: "small",
    events: {
      "onReady": onPlayerReady,
      // 'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      "onStateChange": onPlayerStateChange,
      // 'onError': onPlayerError,
    }
  }));
}

function onPlayerReady(event: any){
  event.target.loadPlaylist({
    playlist: videoIds.value,
    listType: "user_uploads",
    startSeconds: props.interactions[$state.index].vInit,
    suggestedQuality: "small"
  });

  event.target.stopVideo();
  setLoader(false);
}

function onPlayerStateChange(event: any){
  // console.log(YT.PlayerState);
  // @ts-ignore
  if (!$state.isLoader && event.data == YT.PlayerState.PLAYING) {
    const timeSlow = slowRateValue.value === 0.5 ? 2 : 1;

    setTimeout(() => $state.player.pauseVideo(), props.interactions[$state.index].vEnd * 60 * timeSlow);
  }else{
    setLoader(false);
  }
}

function play(playbackRate?: PlayVideo["playbackRate"]){
  slowRateValue.value = playbackRate ?? 1;
  $state.player.setPlaybackRate(slowRateValue.value);
  $state.player.seekTo(props.interactions[$state.index].vInit);
  playVideo();
}

onMounted(() => {
  onYouTubeIframeAPIReady();
});

</script>