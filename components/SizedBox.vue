<template>
  <div :class="`w-[${w}px] h-[${h}px]`" />
</template>

<script lang="ts" setup>
import { defineProps, } from "vue";

defineProps({
  w: {
    type: String,
    default: "0",
  },
  h: {
    type: String,
    default: "0"
  },
});
</script>