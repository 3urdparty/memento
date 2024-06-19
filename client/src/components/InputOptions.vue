<template>
  <div class="@container">
    <InputText :modelValue="currentValue" class="w-full" @keydown="handleKey" />
    <ul
      class="grid gap-2 py-2 grid-cols-1"
      :class="{
        '@xl:grid-cols-2': modelValue.length >= 2 && modelValue.length <= 4,
        '@lg:grid-cols-3': modelValue.length > 4,
      }"
    >
      <TransitionGroup>
        <li
          v-for="(option, idx) in modelValue"
          :key="option.key"
          class="flex align-items-center w-full border border-slate-600 rounded-md py-2 px-2 gap-2 justify-between"
        >
          <div class="flex items-center gap-2">
            <Checkbox
              v-model="modelValue[idx].correct"
              :inputId="option.key"
              name="category"
              :value="option.name"
            />

            <input
              type="text"
              v-model="modelValue[idx].name"
              class="bg-transparent border-0 focus:ring-0"
            />
          </div>
          <Button
            severity="error"
            class="!p-1 !px-1.5"
            @click="modelValue.splice(idx, 1)"
          >
            <Trash class="w-5" />
          </Button>
        </li>
      </TransitionGroup>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="O extends MCQOption">
import Checkbox from 'primevue/checkbox';

import { useVModel } from '@vueuse/core';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { Trash } from 'lucide-vue-next';
import Button from './Button.vue';
import { MCQOption } from '@backend/cards/schemas/card.schema';

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
