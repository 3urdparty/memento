<template>
  <MultiSelect
    v-model="selected"
    :options="options"
    filter
    :loading="loading"
    optionLabel="name"
    display="chip"
    placeholder="Add Contributors"
  >
    <template #chip="{ value }">
      <div class="flex items-center gap-2">
        <img
          v-if="value.imageUrl"
          :src="value.imageUrl"
          alt="avatar"
          class="w-6 h-6 rounded-full"
        />
        <span>{{ value.name }}</span>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <img
          v-if="option.imageUrl"
          :src="option.imageUrl"
          alt="avatar"
          class="w-6 h-6 rounded-full"
        />
        <span>{{ option.name }}</span>
      </div>
    </template>
    <template #footer>
      <div class="py-2 px-3">
        <b>{{ selected ? selected.length : 0 }}</b> users
        {{ (selected ? selected.length : 0) > 1 ? 's' : '' }}
        selected.
      </div>
    </template>
  </MultiSelect>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import MultiSelect from 'primevue/multiselect';
interface Props {
  options: App.Models.User[];
  modelValue: App.Models.User[];
  multiple: boolean;
  loading: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: App.Models.User[]): void;
}
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  multiple: () => false,
});
const emit = defineEmits<Emits>();
const selected = useVModel(props, 'modelValue', emit);
</script>
