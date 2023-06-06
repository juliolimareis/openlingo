<template>
  <div class="bg-white py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">

        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Finish Lesson</h2>

        <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div class="lg:w-full lg:max-w-2xl lg:flex-auto">

            <!-- <div v-for="inter in user.$state.lessons[0].interactions" class="text-xl leading-8 text-gray-600 flex m-2"> -->
            <div class="text-xl leading-8 text-gray-600 flex m-2">
              <div class="bg-primary-200 p-2 rounded-md">Frase</div> <ArrowRightIcon class="w-6 ml-2 mr-2"/>
                <div v-if="true" class="flex p-2 rounded-md bg-teal-100">
                  <span class="mr-2">Certo</span><CheckCircleIcon class="w-6 text-teal-500" />
                </div>
                <div v-else class="flex p-2 rounded-md bg-red-100">
                  <span class="mr-2">Errou</span><InformationCircleIcon class="w-6 text-red-500" />
                </div>
            </div>

          </div>

          <div class="lg:flex lg:flex-auto lg:justify-center">
            <dl class="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
              <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6">
                <dt class="text-sm leading-6 text-gray-600">{{ stat.name }}</dt>
                <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <Button class="w-full mt-10" @click="navigateTo('home', { replace: true })">Home</Button>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware:["auth"] });

import { ArrowRightIcon, InformationCircleIcon, CheckCircleIcon, } from "@heroicons/vue/24/outline";

// const score = useScoreStore();
// const user = useUserStore();

const stats = ref([
  { id: 1, name: "Acertos", value: "8/10" },
  { id: 2, name: "", value: "80%" },
  { id: 3, name: "Erros", value: "2/10" },
  { id: 4, name: "", value: "20%" },
]);

</script>