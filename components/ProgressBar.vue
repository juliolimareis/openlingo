<template>
  <div class="h-5 w-full bg-neutral-200 dark:bg-gray-300">
    <div class="h-5 bg-primary-500" :style="{width: `${progress}%`}"></div>
  </div>
</template>

<script lang="ts" setup>

defineProps<{
  progress: number | string
}>();
</script>