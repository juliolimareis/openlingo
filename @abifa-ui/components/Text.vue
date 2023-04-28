<template>
  <h1 v-if="type === 'title'" class="text-2xl lg:text-4x1 md:text-3xl text-gray-900">
    <slot />
  </h1>

  <h1 v-else-if="type === 'subtitle'" class="text-lg md:text-xl text-gray-900">
    <slot />
  </h1>

  <p v-else class="text-gray-900"><slot/></p>
</template>

<script lang="ts" setup>
defineProps<{
    type?: "title" | "subtitle" | "base"
  }>();
</script>