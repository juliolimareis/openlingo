<template>
  <div class="overflow-x-hidden">
    <ProgressBar :progress="progress"/>

    <div class="text-left pt-2 ml-3">
      <button class="text-gray-700"
        @click="backToHome"
        title="Leave the lesson"
      >
        <XMarkIcon class="h-7 w-7 text-gray-500 hover:text-red-500 transition-all duration-500" aria-hidden="true" />
      </button>
    </div>

    <Container>

      <!-- <component v-if="interactions.length" :is="lessonComponent" :interactions="interactions"/> -->

      <Interaction v-if="interactionTypeSelected" :interactionType="interactionTypeSelected"/>

      <div class="p-2">
        <div class="flex justify-start mt-10">
          <Word v-if="!wordsLine.length" class="invisible" word="本当" />
          <Word
            v-for="w in wordsLine"
            :word="w.word"
            @click="addOrRemoveWordLine(w)"
          />
        </div>

        <hr />

        <div class="flex justify-start">
          <Word class="invisible" word="f" />
        </div>

        <hr />
      </div>

      <!-- Options -->

      <div class="mt-3">
        <div class="m-auto min-h-[50px]" :style="{ maxWidth: '800px' }">
          <Word
            v-for="w in wordsOptions"
            class="ml-2 float-left"
            :word="w.word"
            @click="addOrRemoveWordLine(w)"
          />
        </div>
      </div>

      <Alert
        v-if="isCorrect !== undefined"
        class="h-full mt-5"
        :type="isCorrect ? 'success' : 'error'"
        :title="isCorrect ? 'Correct' : 'Incorrect'"
      >
        <div v-if="!isCorrect">
          <p class="font-bold mt-3"><b class="text-red-600">Correct Answer</b>: {{ interactionTypeSelected?.translation }}</p>
          <p class="font-bold mt-3"><b class="text-red-600">Meaning</b>: {{ interactionTypeSelected?.phrase }}</p>
        </div>

        <Button @click="nextInteraction" :class="['mt-5','w-[99%]', `${isCorrect ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'}`]">Próximo</Button>
      </Alert>

      <SizedBox v-if="isCorrect === undefined" width="50" height="50"></SizedBox>

      <div v-if="isCorrect === undefined" class="p-5">
        <Button :disabled="!wordsLine.length" @click="finishInteraction" class="w-[99%]">Conferir</Button>
      </div>

    </Container>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

import { XMarkIcon, } from "@heroicons/vue/24/outline";

const { $state } = useUserStore();
const player = usePlayerStore();
const score = useScoreStore();

const interactionIndex = ref(0);
const wordsOptions = ref<Word[]>([]);
const wordsLine = ref<Word[]>([]);
const interactions = ref<Interaction[]>([]);
const progress = ref(0);
const progressPeace = ref(0);
const isCorrect = ref<boolean | undefined>();
const isFinish = ref(false);
// const lessonComponent = shallowRef<any>(Speaker);
const interactionsType = ref<InteractionType[]>([]);
const interactionTypeSelected = ref<InteractionType>();
const allPhrasesSplit = ref<string[]>([]);
const allTranslationsSplit = ref<string[]>([]);

function addOrRemoveWordLine(word: Word){
  if(isCorrect.value !== undefined) return;

  if(wordsLine.value.some(w => w.id === word.id)){
    wordsLine.value = wordsLine.value.filter(wl => wl.id !== word.id);
    wordsOptions.value.push(word);
  }else{
    wordsOptions.value = wordsOptions.value.filter(wl => wl.id !== word.id);
    wordsLine.value.push(word);
  }
}

function backToHome(){
  navigateTo("/home");
}

function finishInteraction(){
  if(interactionTypeSelected.value){
    if(interactionTypeSelected.value.interaction.phrases.includes(wordsLine.value.map(w => w.word).join(" "))){
      isCorrect.value = true;
    }else{
      isCorrect.value = false;
    }

    interactionTypeSelected.value.isHit = isCorrect.value;
    score.addInteractionsType(interactionTypeSelected.value);
  }
}

function nextInteraction(){
  if(interactionsType.value[interactionIndex.value + 1]){
    interactionIndex.value++;
    interactionTypeSelected.value = interactionsType.value[interactionIndex.value];
    progress.value += progressPeace.value;
    isCorrect.value = undefined;
    wordsLine.value = [];
    handleWordsOptions();

    if(interactionTypeSelected.value.interaction.videoId){
      player.setIndex(interactionIndex.value);
    }
  }else{
    isFinish.value = true;
    navigateTo("/score", { replace: true });
  }
}

function handleWordsOptions() {
  if(interactionTypeSelected.value){
    wordsOptions.value = interactionTypeSelected.value.translation.split(" ").map((word, i) => ({
      id: i,
      word
    }));
  }

  const amountAddOptions = randomInt(4);
  let indexWordsOptions = wordsOptions.value.length + 1;

  if(interactionTypeSelected.value?.isInverse){
    for(let i = 0; i < amountAddOptions; i++){
      wordsOptions.value.push({
        id: indexWordsOptions,
        word: allTranslationsSplit.value[randomInt(allTranslationsSplit.value.length)]
      });

      indexWordsOptions++;
    }
  }else{
    for(let i = 0; i < amountAddOptions; i++){
      wordsOptions.value.push({
        id: indexWordsOptions,
        word: allPhrasesSplit.value[randomInt(allPhrasesSplit.value.length)]
      });

      indexWordsOptions++;
    }
  }

  wordsOptions.value = shuffleArray(wordsOptions.value);
}

function handleInteractionType(){
  const types = ["audio", "learn", "learn-audio"] as InteractionType["type"][];
  let type = "audio" as InteractionType["type"];
  let phrase = "";
  let translation = "";
  let isInverse = false;
  let isAcceleratedAudio = false;

  interactions.value.forEach(interaction => {
    player.addVideoId(interaction?.videoId ?? "");
    type = types[randomInt(types.length)];
    interaction.phrases.map(p => p.split(" ").forEach(w => allPhrasesSplit.value.push(w)));
    interaction.translations.map(p => p.split(" ").forEach(w => allTranslationsSplit.value.push(w)));

    //randomiza onde vai aparecer a tradução.
    // isInverse = a tradução vai aparecer acima.
    if(randomInt(2)){
      phrase = interaction.phrases[randomInt(interaction.phrases.length)];
      translation = interaction.phrases[randomInt(interaction.translations.length)];
      isInverse = false;
    }else{
      translation = interaction.phrases[randomInt(interaction.phrases.length)];
      phrase = interaction.translations[randomInt(interaction.translations.length)];
      isInverse = true;
    }

    if(type.includes("audio")){
      isAcceleratedAudio = !!(randomInt(11) < 3);
    }

    interactionsType.value.push({
      type,
      interaction,
      isHit: false,
      phrase,
      translation,
      isInverse,
      isAcceleratedAudio
    });
  });

  interactionsType.value = shuffleArray(interactionsType.value);
  interactionTypeSelected.value = interactionsType.value[0];
}

onMounted(() => {
  interactions.value = $state?.lesson?.interactions ?? [];
  progressPeace.value = 100 / interactions.value.length;
  handleInteractionType();

  handleWordsOptions();
});

</script>