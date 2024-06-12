<template>
  <div>
    <InputText :modelValue="currentValue" class="w-full" @keydown="handleKey" />
    <ul class="grid grid-cols-2 gap-2 py-2">
      <li
        v-for="(option, idx) in modelValue"
        :key="option.key"
        class="flex align-items-center w-full border border-slate-600 rounded-md py-2 px-2 flex gap-2"
      >
        <Checkbox
          v-model="modelValue[idx].correct"
          :inputId="option.key"
          name="category"
          :value="option.name"
        />
        <label :for="option.key">{{ option.name }}</label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="O extends Option">
import Checkbox from 'primevue/checkbox';
export type Option = {
  key: string;
  name: string;
  correct: boolean;
};

import { useVModel } from '@vueuse/core';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

interface Props {
  modelValue: O[];
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:selectedCategories', value: string[]): void;
}
const emits = defineEmits<Emits>();
const options = useVModel(props, 'modelValue', emits);
const currentValue = ref('');

const handleKey = (e: KeyboardEvent) => {
  currentValue.value = e.target.value;
  if (e.key === 'Enter') {
    options.value.push({
      key: currentValue.value,
      name: currentValue.value,
      correct: false,
    });
    currentValue.value = '';
  }
};
</script>
