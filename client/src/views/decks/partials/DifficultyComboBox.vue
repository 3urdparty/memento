<template>
  <!-- @vue-ignore -->
  <ComboBox v-model="selected" :items="items" displayValue="value" />
</template>
<script setup lang="ts">
import ComboBox, { type Option } from '@/components/ComboBox.vue';
import { useVModel } from '@vueuse/core';
import { Angry, Annoyed, Frown, Laugh, Meh } from 'lucide-vue-next';
interface Props {
  modelValue: string;
}
const items: Option[] = [
  {
    name: 'Easy',
    value: 'easy',
    icon: Laugh,
    activeClasses: 'text-green-500',
    inactiveClasses: 'text-green-300',
  },
  {
    value: 'medium',
    name: 'Medium',
    icon: Meh,
  },
  {
    value: 'hard',
    name: 'Hard',
    icon: Annoyed,
  },
  {
    value: 'very hard',
    name: 'Very Hard',
    icon: Frown,
  },
  {
    value: 'expert',
    name: 'Expert',
    icon: Angry,
  },
];

interface Emits {
  (e: 'update:modelValue', value: any): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const selected = useVModel(props, 'modelValue', emits);
</script>
