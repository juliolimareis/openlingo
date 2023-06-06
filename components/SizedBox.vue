<template>
  <div :style="`width: ${width}px; height: ${height}px`" />
</template>

<script lang="ts" setup>
import { defineProps, } from "vue";

defineProps<{
  width?: number | string;
  height?: number | string;
}>();
</script>