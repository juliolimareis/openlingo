<template>
  <label class="text-left block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
  <div class="mt-2">
    <input
      :type="type"
      :placeholder="placeholder"
      class="
        block
        rounded-md
        border-0
        py-1.5
        text-gray-900
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        placeholder:text-gray-400
        focus:ring-2
        focus:ring-inset
        focus:ring-primary
        sm:text-sm sm:leading-6
      "
      :value="value"
      @input="onChange($event)"
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, } from "vue";

const _value = ref("");

const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: {
    type: String,
    default: ""
  },
  onChange:{
    type: Function,
    default: (event: any) => {}
  }
});

onMounted(() => {
  _value.value = props.value;
});

function onChange(event: any){
  _value.value = event.target.value;

  if(props.onChange) props?.onChange(event.target.value);
}

</script>
