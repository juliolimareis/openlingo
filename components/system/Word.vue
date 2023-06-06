<template>
  <div class="m-1 text-center cursor-pointer rounded-xl p-2 w-fit text-gray-700 border-2 border-gray-300 shadow-xl">
    {{ word }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  word: string
}>();
</script>