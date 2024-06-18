<template>
  <MarkdownEditor v-model="modelValue" />
</template>
<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import { useVModel } from '@vueuse/core';
interface Props {
  modelValue: string;
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();
const modelValue = useVModel(props, 'modelValue', emit);
</script>
