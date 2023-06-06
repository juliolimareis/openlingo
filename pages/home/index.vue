<template>
  <CardLesson
    v-for="lesson in lessons"
    :lesson="lesson"
  />

</template>

<script lang="ts" setup>
const { fetch } = useLessonRepository();
const lessons = ref<Lesson[]>([]);
const { $state } = useUserStore();

onMounted(() => {
  fetch().then(({ data }) => {
    lessons.value = data;
  });
});

</script>