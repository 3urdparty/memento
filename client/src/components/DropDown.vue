<template>
  <Dropdown
    v-model="selected"
    :options="options"
    :dataKey="dataKey"
    :inputId="inputId"
    :placeholder="placeholder"
  >
    <template #value="{ value, placeholder }">
      <div v-if="value" class="flex items-center">
        <div class="flex items-center gap-2">
          <component :is="value.icon" class="w-4 h-4" />
          {{ value.name }}
        </div>
      </div>
      <span v-else>
        <span class="text-slate-500 dark:text-slate-400">{{
          placeholder
        }}</span>
      </span>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-1">
        <component :is="option.icon" class="w-4 h-4 mr-2" />
        <span>{{ option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>
<script setup lang="ts" generic="T extends Option">
export type Option = {
  name: string;
  value: string;
  icon?: any;
};
import { defineProps, ref, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import { useVModel } from '@vueuse/core';

interface Props {
  modelValue: string;
  name?: string;
  dataKey?: string;
  inputId?: string;
  placeholder?: string;
  options: T[];
}

const props = withDefaults(defineProps<Props>(), {
  dataKey: 'value',
  inputId: 'dropdown',
  placeholder: 'Select an option',
  options: () => [],
});

interface Emits {
  (e: 'update:modelValue', value: T): void;
}
const emits = defineEmits<Emits>();
const selected = ref<T | null>(null);
const modelValue = useVModel(props, 'modelValue', emits);
watch(selected, (newVal) => {
  if (newVal) modelValue.value = newVal.value;
});
</script>
