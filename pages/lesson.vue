<template>
  <Container>
    <div class="flex">
      <div @click="playAudio()" class="mr-6">
        <SpeakerWaveIcon class="w-24 text-primary" />
      </div>
      <div @click="playAudio(0.5)">
        <TruckIcon class="w-14 mt-5 text-primary" />
      </div>
    </div>

    <div id="sound" class="invisible" aria-hidden></div>
  </Container>
</template>

<script lang="ts" setup>
import { SpeakerWaveIcon, TruckIcon, } from "@heroicons/vue/24/solid";

const player = ref();
const videoId = ref("qANpuNm9Dkg");

function onYouTubeIframeAPIReady() {
  // https://developers.google.com/youtube/iframe_api_reference?hl=pt-br
  player.value = new YT.Player("sound", {
    height: "360",
    width: "640",
    videoId: "M7lc1UVf-VE",
    suggestedQuality: "small"
  });
}

function playAudio(backRate?: number){
  player.value.setPlaybackRate(backRate ?? 1);

  player.value.loadVideoById({
    videoId: videoId.value,
    startSeconds: 1,
    endSeconds: 2.6,
    playbackRate: 2
  });
}

onMounted(() => {
  onYouTubeIframeAPIReady();
});
</script>