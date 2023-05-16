<template>
  <div class="overflow-x-hidden">
    <ProgressBar :progress="progress"/>

    <Container>

      <Speaker :interaction="interactions[interactionIndex]"/>

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

      <div class="flex justify-center mt-10">
        <Word
          v-for="w in wordsOptions"
          :word="w.word"
          @click="addOrRemoveWordLine(w)"
        />
      </div>

      <Alert :type="alertType">
        <p v-if="isCorrect" class="text-sm">Correto.</p>

        <div v-else>

        </div>
      </Alert>

      <SizedBox v-if="hiddenButton" width="50" height="50"></SizedBox>

      <div v-if="hiddenButton" class="p-5">
        <Button class="w-[99%]">Conferir</Button>
      </div>

    </Container>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth"] });

const { $state } = useUserStore();
const interactionIndex = ref(0);
const wordsOptions = ref<Word[]>([]);
const wordsLine = ref<Word[]>([]);
const progress = ref(0);
const isCorrect = ref(false);
const hiddenButton = ref(false);
const alertType = ref<"success" | "error">("success");
// const lines = ref([[]]);

const interactions = ref($state.lessons[0].interactions);

function addOrRemoveWordLine(word: Word){
  if(wordsLine.value.some(w => w.id === word.id)){
    wordsLine.value.splice(word.id, 1);
    wordsOptions.value.push(word);
  }else{
    wordsOptions.value.splice(word.id, 1);
    wordsLine.value.push(word);
  }
}

function finishInteraction(){
  hiddenButton.value = true;
  // if()
  nextInteraction();
}

function nextInteraction(){
  if(interactionIndex.value < wordsLine.value.length){
    interactionIndex.value++;
    progress.value += 10;
    handleWordsOptions();
    hiddenButton.value = false;
  }
}

function handleWordsOptions() {
  wordsOptions.value = getActualInteraction().phrase[0].split(" ").map((word, i) => ({
    id: i,
    word
  }));
}

function getActualInteraction(){
  return interactions.value[interactionIndex.value];
}

onMounted(() => {
  handleWordsOptions();
});

</script>