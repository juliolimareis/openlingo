<template>
    <div v-if="loader" class="m-auto">
      <Loader class="m-auto" :size="'lg'" />
      <p class="text-center text-lg mt-5 text-gray-500">loading lessons ....</p>
    </div>

    <ul v-else role="list" class="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        <CardLesson
        v-for="lesson in lessons"
        v-if="!loader"
        :lesson="lesson"
      />
  </ul>

</template>

<script lang="ts" setup>
const { fetch } = useLessonRepository();
const lessons = ref<Lesson[]>([]);
const loader = ref(true);

onMounted(() => {
  fetch().then(({ data }) => {
    lessons.value = data;
  }).finally(() => loader.value = false);
});

</script>