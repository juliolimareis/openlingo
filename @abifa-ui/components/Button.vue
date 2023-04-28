<template>
  <button
    :class="`
      m-1
      px-3
      py-2
      text-sm
      shadow-sm
      rounded-md
      font-semibold
      -hover:bg-indigo-500
      focus-visible:outline
      focus-visible:outline-2
      focus-visible:outline-offset-2
      inline-flex items-center gap-x-2
      -focus-visible:outline-indigo-600
      ${!secondary && 'bg-primary text-white'}
      ${secondary && 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}
      ${params}`
    "
    :disabled="disabled"
  >
   <slot /> 
  </button>
</template>

<script lang="ts" setup>

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false
  }
});

const params = () => {
  if(props.disabled){
    return "disabled:opacity-50";
  }
};

</script>
