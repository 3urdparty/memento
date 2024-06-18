<template>
  <Dialog
    maximizable
    v-model:visible="open"
    modal
    header="Create Card"
    :style="{ width: '25rem' }"
  >
    <Form v-model="form"> </Form>

    <Button @click="() => emit('create', values())">
      <Plus class="w-5 h-5" />
      Create
    </Button>
  </Dialog>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form from '@/components/Form.vue';
import { useForm } from '@/composables/form';
import { useVModel } from '@vueuse/core';
import { FolderPen, Plus, Shuffle } from 'lucide-vue-next';
import Dialog from 'primevue/dialog';
import { CreateCardDto } from '@backend/cards/dto/create-card.dto';
import ClozeEdit from '@/components/ClozeEdit.vue';
import { Deck, Field } from '@backend/decks/schemas/deck.schema';
import { Card } from '@backend/cards/schemas/card.schema';

const question_types = [
  {
    name: 'Multiple Choice',
    value: 'multiple-choice',
  },
  {
    name: 'True/False',
    value: 'true-false',
  },
  {
    name: 'Fill in the Blank',
    value: 'fill-in-the-blank',
  },
  {
    name: 'Short Answer',
    value: 'short-answer',
  },
  {
    name: 'Matching',
    value: 'matching',
  },
  {
    name: 'Essay',
    value: 'essay',
  },
  {
    name: 'Diagram',
    value: 'diagram',
  },
  {
    name: 'Card',
    value: 'card',
  },
  {
    name: 'Steps',
    value: 'steps',
  },
];
const { form, values } = useForm({
  type: {
    type: 'select',
    options: question_types,
    icon: FolderPen,
    value: question_types[2].value,
    required: true,
    removable: false,
    placeholder: 'Name',
    movable: false,
    editable: false,
    default: 'Chapter 1',
  },
  question: {
    type: 'text',
    icon: FolderPen,
    value: null,
    required: true,
    removable: false,
    placeholder: 'Name',
    show: (form) =>
      !(['fill-in-the-blank'] as Card['type'][]).includes(form['type'].value),
  },
  options: {
    type: 'inputoptions',
    show: (form) => form['type'].value === 'multiple-choice',
    icon: FolderPen,
    value: [],
    required: true,
    placeholder: 'Options',
    props: {
      maximized: true,
    },
  },
  shuffle: {
    showLabel: false,
    name: 'shuffle',
    value: false,
    type: 'checkbox',
    icon: Shuffle,
    show: (form) => form['type'].value === 'multiple-choice',
  },
  fill_in_the_blanks: {
    name: 'Answer',
    component: ClozeEdit,
    show: (form) => form['type'].value === 'fill-in-the-blank',
  },
  short_answer: {
    name: 'Answer',
    component: 'markdown',
    show: (form) => form['type'].value === 'short-answer',
  },
});
interface Props {
  open: boolean;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'create', value: CreateCardDto): void;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:open', value: boolean): void;
}

const emit = defineEmits<Emits>();

const open = useVModel(props, 'open', emit);
</script>
