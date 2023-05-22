<template>
  <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    <div class="flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">{{ capitalizeFirstLetter(lesson.title) }}</h3>

          <span v-for="tag in tags" class="inline-flex flex-shrink-0 items-center rounded-full bg-primary-400 px-1.5 py-0.5 text-xs font-medium text-white ring-1 ring-inset ring-primary-600/20">#{{ tag }}</span>
        </div>
        <p class="mt-1 truncate text-sm text-gray-500">{{ capitalizeFirstLetter(lesson.desc) }}</p>
      </div>
      <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="`${images[lesson.langId]}`" alt="lang-flag" />
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1 cursor-pointer">
          <a @click="startLesson" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
            <AcademicCapIcon class="h-5 w-5 text-primary-400" aria-hidden="true" />
              Lesson
          </a>
        </div>
        <div class="-ml-px flex w-0 flex-1 cursor-pointer">
          <a class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
            <PlusIcon class="h-5 w-5 text-primary-400 " aria-hidden="true" />
              Follow
          </a>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { EnvelopeIcon, PhoneIcon, AcademicCapIcon, PlusIcon, } from "@heroicons/vue/20/solid";

import { filename, } from "pathe/utils";

const glob = import.meta.glob("~/assets/images/flags/*.jpg", { eager: true });
const images = Object.fromEntries(
  //@ts-ignore
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const { setLesson } = useUserStore();

const props = defineProps<{
  lesson: Lesson;
}>();

const tags = ref<string[]>([]);

function startLesson(){
  setLesson(props.lesson);
  navigateTo("/lesson");
}

onMounted(() => {
  tags.value = props.lesson.tag.split(",").filter(t => t);
});

</script>