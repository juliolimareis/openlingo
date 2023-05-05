<script setup>
const { locale } = useI18n();
const context = useNuxtApp();

onMounted(() => {
  locale.value = navigator.language;

  console.log( navigator.language);
});

</script>
<template>
  {{ context.userData }}
  <div>
    <form>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="pt-BR">pt</option>
      </select>
      <p>{{ $t('welcome') }}</p>
      <p>{{ $t('create account') }}</p>
    </form>
  </div>
</template>