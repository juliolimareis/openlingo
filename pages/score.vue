<template>
  <div class="bg-white py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">

        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Finish Lesson</h2>

        <div class="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div class="lg:w-full lg:max-w-2xl lg:flex-auto">

            <!-- <div class="text-xl leading-8 text-gray-600 flex m-2"> -->
            <div v-for="interType in score.$state.interactionsType" class="text-xl leading-8 text-gray-600 flex m-2">
              <div class="bg-primary-200 p-2 rounded-md">{{ interType.phrase }}</div> <ArrowRightIcon class="w-6 ml-2 mr-2"/>
                <div v-if="interType.isHit" class="flex p-2 rounded-md bg-teal-100">
                  <span class="mr-2">{{ interType.translation }}</span>
                </div>
                <div class="flex" v-else>
                  <div class="flex p-2 rounded-md bg-red-100">
                    <span class="mr-2">{{ interType.answer }}</span>
                  </div>
                  <ArrowRightIcon class="w-6 ml-2 mr-2"/>
                  <div class="flex p-2 rounded-md bg-teal-100">
                    <span class="mr-2">{{ interType.translation }}</span>
                  </div>
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

        <Button class="w-full mt-14 bg-teal-500 hover:bg-teal-600" @click="navigateTo('/lesson', { replace: true })">Try again</Button>
        <Button class="w-full mt-5"
          @click="navigateTo('/home', { replace: true })"
        >
          Home
        </Button>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware:["auth"] });

import { ArrowRightIcon, } from "@heroicons/vue/24/outline";

const score = useScoreStore();
const total = score.interactionsType.length;
const corrects = score.interactionsType.filter(i => i.isHit).length;
const errors = score.interactionsType.filter(i => !i.isHit).length;

const statsCorrect = (100 / total) * corrects;
const statsError = (100 / total) * errors;

const stats = ref([
  { id: 1, name: "Correct", value: `${corrects}/${total}` },
  { id: 2, name: "", value: `${statsCorrect || 0}%` },
  { id: 3, name: "Erros", value: `${errors}/${total}` },
  { id: 4, name: "", value: `${statsError || 0}%` },
]);

</script>