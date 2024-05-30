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
      <div class="flex items-center gap-2 -mt-1 -mx-1 py-0.5 px-0.5 pr-1">
        <Avatar v-if="value.imageUrl" v-bind="value.avatar" class="w-7 h-7" />
        <span class="pt-1">{{ value.name }}</span>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-2">
        <Avatar
          v-if="option.imageUrl"
          v-bind="option.avatar"
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
import { User } from '@backend/users/schemas/user.schema';
import { useVModel } from '@vueuse/core';
import MultiSelect from 'primevue/multiselect';
import { ref, watch } from 'vue';
import { Avatar } from 'vue3-avataaars';
interface Props {
  options: App.Models.User[];
  modelValue: App.Models.User[];
  multiple?: boolean;
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
const selected = ref<User[]>([]);
watch(selected, (value) => {
  //@ts-ignore
  modelValue.value = value.map((v) => v._id);
});
const modelValue = useVModel(props, 'modelValue', emit);
</script>
