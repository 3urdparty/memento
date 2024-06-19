<template>
  <MarkdownEditor v-model="content" class="h-60" />
</template>
<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import { ClozeSegment } from '@backend/cards/schemas/card.schema';
import { onMounted, ref, watch } from 'vue';
interface Props {
  modelValue: ClozeSegment[];
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:modelValue', value: ClozeSegment[]): void;
}
const emit = defineEmits<Emits>();

const parse = (input: string): ClozeSegment[] => {
  const regex = /(\[.*?\]|[^[\]]+)/g;
  const matches = input.match(regex);
  if (!matches) return [];
  const result = matches.map((match) => {
    if (match.startsWith('[')) {
      return {
        value: match.slice(1, -1),
        type: 'cloze',
      };
    } else {
      return { value: match, type: 'text' };
    }
  });
  return result as ClozeSegment[];
};

const stringify = (input: { value: string; type: string }[]) => {
  if (!input) return '';
  return input
    .map((segment) => {
      if (segment.type === 'cloze') {
        return `[${segment.value}]`;
      } else {
        return segment.value;
      }
    })
    .join('');
};

const content = ref<string>('');

onMounted(() => {
  content.value = stringify(props.modelValue);
});

watch(content, () => {
  emit('update:modelValue', parse(content.value));
});
</script>
