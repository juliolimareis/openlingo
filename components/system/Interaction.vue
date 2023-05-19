<template>
  <div id="interaction-player" class="absolute top-[-500px] invisible z-[-10]" aria-hidden></div>
  <div class="mt-10">

    <div v-if="interactionType.type.includes('audio') && !interactionType.isInverse && interactionType.interaction.videoId">
      <div v-if="!player.$state.isLoader">
        <span class="flex justify-center">
          <SpeakerWaveIcon @click="play()" :class="`text-white p-4 border-b-4 border-primary-800 rounded-xl cursor-pointer w-24 h-24 mr-6 ${playAudio.isPlay && playAudio.type === 'normal' ? 'shake' : ''}  ${playAudio.isPlay && playAudio.type !== 'normal' ? 'bg-primary-200 border-primary-200' : 'bg-primary-500'}`" />
          <TruckIcon @click="play(0.5)" :class="`text-white p-2 border-b-4 border-primary-800 rounded-xl cursor-pointer w-12 h-12 mt-12 ${playAudio.isPlay && playAudio.type === 'slow' ? 'shake' : ''} ${playAudio.isPlay && playAudio.type !== 'slow' ? 'bg-primary-200 border-primary-200' : 'bg-primary-500'}`" />
        </span>

        <div v-if="interactionType.isAcceleratedAudio" class="text-center mt-2">
          <span class="rounded-lg text-white bg-orange-400 p-[6px] text-[12px]"><b>Accelerated</b></span>
        </div>
      </div>

      <Loader v-else class="m-auto" size="lg" />
    </div>

    <div v-if="interactionType.type.includes('learn') || interactionType.isInverse" class="mt-5">
      <Word class="m-auto" :word="interactionType.phrase" />
    </div>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

import { SpeakerWaveIcon, TruckIcon, } from "@heroicons/vue/24/solid";

const props = defineProps<{
  interactionType: InteractionType
}>();

const player = usePlayerStore();
const slowRateValue = ref(1);

const playAudio = reactive({
  type: "normal" as "normal" | "slow",
  isPlay: false,
});

// https://developers.google.com/youtube/iframe_api_reference?hl=pt-br
function onYouTubeIframeAPIReady() {
  // @ts-ignore
  player.setPlayer(new YT.Player("interaction-player", {
    height: "450",
    width: "450",
    videoId: props.interactionType.interaction.videoId,
    suggestedQuality: "small",
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange,
      // 'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      // 'onError': onPlayerError,
    }
  }));
}

function onPlayerReady(){
  player.configurePlayList();

  // event.target.loadPlaylist({
  //   playlist: videoIds.value,
  //   listType: "user_uploads",
  //   startSeconds: props.interactions[$state.index].vInit,
  //   suggestedQuality: "small"
  // });

  // event.target.stopVideo();
  // setLoader(false);
}

function onPlayerStateChange(event: any){
  // console.log(YT.PlayerState);
  // @ts-ignore
  if (!player.$state.isLoader && event.data == YT.PlayerState.PLAYING) {
    const timeSlow = slowRateValue.value === 0.5 ? 2 : 1;

    setTimeout(() => {
      player.$state.player.pauseVideo();
      playAudio.isPlay = false;
    }, props.interactionType.interaction.vEnd * 60 * timeSlow
    );
  }else{
    player.setLoader(false);
  }
}

function play(playbackRate?: PlayVideo["playbackRate"]){
  if(playAudio.isPlay) return;

  slowRateValue.value = playbackRate ?? 1;

  playAudio.isPlay = true;
  playAudio.type = slowRateValue.value === 1 ? "normal" : "slow";

  if(props.interactionType.isAcceleratedAudio){
    slowRateValue.value += 0.5;
    playAudio.type = slowRateValue.value === 1.5 ? "normal" : "slow";
  }

  player.playVideo(props.interactionType.interaction.vInit, slowRateValue.value);
}

onMounted(() => {
  onYouTubeIframeAPIReady();
});

</script>

<style>
.shake {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 4s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>