<template>
  <div class="overflow-x-hidden">
    <ProgressBar :progress="progress"/>

    <Container>

      <component v-if="interactions.length" :is="lessonComponent" :interactions="interactions"/>

      <!-- <Speaker v-if="interactions.length && invokeSpiker" :interaction="interactions[interactionIndex]"/> -->

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

      <Alert
        class="h-full"
        v-if="isCorrect !== undefined"
        :type="isCorrect ? 'success' : 'error'"
        :title="isCorrect ? 'Correto' : 'Incorreto'"
      >
        <div v-if="!isCorrect">
          <!-- Erro :( -->
        </div>

        <Button @click="nextInteraction" :class="['w-[99%]', `${isCorrect ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'}`]">Próximo</Button>
      </Alert>

      <SizedBox v-if="isCorrect === undefined" width="50" height="50"></SizedBox>

      <div v-if="isCorrect === undefined && wordsLine.length" class="p-5">
        <Button @click="finishInteraction" class="w-[99%]">Conferir</Button>
      </div>

    </Container>
  </div>
</template>

<script lang="ts" setup>
import Speaker from "~/components/system/Speaker.vue";

definePageMeta({ middleware: ["auth"] });

const { $state } = useUserStore();
const player = useVideoStore();
const interactionIndex = ref(0);
const wordsOptions = ref<Word[]>([]);
const wordsLine = ref<Word[]>([]);
const interactions = ref<Interaction[]>([]);
const progress = ref(0);
const isCorrect = ref<boolean | undefined>();
const isFinish = ref(false);
const lessonComponent = shallowRef<any>(Speaker);

const score = reactive<LessonScore>({
  hits: 0,
  errors: 0,
  time: 0
});

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

function finishInteraction(){
  if(interactions.value[interactionIndex.value]){
    if(interactions.value[interactionIndex.value].phrase.includes(wordsLine.value.map(w => w.word).join(" "))){
      isCorrect.value = true;
      score.hits++;
    }else{
      score.errors++;
      isCorrect.value = false;
    }
  }
}

function nextInteraction(){
  if(wordsLine.value.length >= interactionIndex.value + 1){
    interactionIndex.value++;
    progress.value += 10;
    isCorrect.value = undefined;
    wordsLine.value = [];
    handleWordsOptions();
    // player.$state.video.destroy();
    player.setIndex(interactionIndex.value);
  }else{
    alert("finish!");
    isFinish.value = true;
    // navigateTo("/home");
  }
}

function handleWordsOptions() {
  if(interactions.value.length){
    wordsOptions.value = interactions.value[interactionIndex.value].phrase[0].split(" ").map((word, i) => ({
      id: i,
      word
    }));
  }
}

function lessonTime(){
  const time = setInterval(() => {
    // time.cl
    score.time++;
  }, 1000);
}

onMounted(() => {
  interactions.value = $state?.lessons[0]?.interactions ?? [];

  handleWordsOptions();
});

</script>