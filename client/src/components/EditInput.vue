<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import { PencilIcon } from 'lucide-vue-next';
import { ref } from 'vue';
const editing = ref(false);
interface Props {
  modelValue: string;
}
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const input = ref<HTMLInputElement | null>(null);
const value = useVModel(props, 'modelValue');
</script>
<template>
  <div class="relative w-full flex items-center group">
    <input
      ref="input"
      class="font-semibold leading-6 text-lg px-0 capitalize bg-transparent focus:outline-none focus:ring-0 border-none w-full"
      v-model="value"
      :class="{
        'text-green-400': editing,
        'text-slate-200/80': !editing,
      }"
      :disabled="!editing"
    />
    <button
      @click="
        editing = !editing;
        input?.focus();
      "
      class="absolute right-0 mr-2 group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out"
    >
      <PencilIcon class="w-5 h-5 text-slate-200/80" />
    </button>
  </div>
</template>
