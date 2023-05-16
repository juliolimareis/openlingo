<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img class="w-full h-48" :srcset="lesson.urlCover" :alt="lesson.title">

    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 h-8 overflow-hidden">{{ capitalizeFirstLetter(lesson.title) }}</div>
      <p class="text-gray-700 text-base h-20 overflow-auto">
        {{ capitalizeFirstLetter(lesson.desc) }}
      </p>
    </div>

    <hr>

    <div class="px-6 pt-4 pb-2">
      <div class="h-10 overflow-auto">
        <span
          v-for="tag in tags"
          class="inline-block bg-primary-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          #{{ tag }}
        </span>
      </div>

      <hr>

      <div>
        <div class="float-left p-2">
          <NuxtLink :to="`/profile/${lesson.createUserId}`" class="leading-6 text-primary-400 hover:text-primary-700">
            Jonathan Reinink
          </NuxtLink>
          {{ ' - ' }}
          <span class="text-gray-600 leading-none">Aug 18</span>
        </div>

        <div class="float-right">
          <Button @click="startLesson">Estudar</Button>
        </div>
      </div>

      <!-- <div class="mt-1 flex items-center">
        <img class="w-10 h-10 rounded-full mr-4" srcset="https://cdn.pixabay.com/photo/2016/05/03/16/10/morning-1369446_960_720.jpg" alt="Avatar of Jonathan Reinink">
        <div class="text-sm">
          <p class="text-gray-900 leading-none">Jonathan Reinink</p>
          <p class="text-gray-600">Aug 18</p>
        </div>
      </div> -->
    </div>

  </div>
</template>

<script lang="ts" setup>
const { setLesson, clearLessons } = useUserStore();

const props = defineProps<{
  lesson: Lesson;
}>();

const tags = ref<string[]>([]);

function startLesson(){
  clearLessons();
  setLesson(props.lesson);
  navigateTo("/lesson");
}

onMounted(() => {
  tags.value = props.lesson.tag.split(",").filter(t => t);
});

</script>