<template>
  <div :id="id" class="absolute z-[-10] top-[-500px]" ></div>
  <div class="mt-10">
    <span class="flex justify-center">
      <SpeakerWaveIcon @click="play()" class="cursor-pointer w-24 mr-6 text-primary-500" />
      <TruckIcon @click="play(0.5)" class="cursor-pointer w-14 mt-5 text-primary-500" />
    </span>
  </div>

</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

import { SpeakerWaveIcon, TruckIcon, } from "@heroicons/vue/24/solid";
import { v4 as uuidv4, } from "uuid";

const props = defineProps<{
  interaction: Interaction
}>();

const { videoId, vInit, vEnd } = props.interaction;

const player = ref();
const id = uuidv4();

// https://developers.google.com/youtube/iframe_api_reference?hl=pt-br
function onYouTubeIframeAPIReady() {
  player.value = new YT.Player(id, {
    height: "50",
    width: "50",
    videoId: "M7lc1UVf-VE",
    suggestedQuality: "small"
  });
}

function play(playbackRate?: PlayVideo["playbackRate"]){
  player.value.setPlaybackRate(playbackRate ?? 1);

  player.value.loadVideoById({
    videoId,
    startSeconds: vInit,
    endSeconds: vEnd,
    playbackRate
  });
}

onMounted(() => {
  onYouTubeIframeAPIReady();
});
</script>