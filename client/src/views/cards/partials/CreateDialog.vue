<template>
  <Dialog maximizable v-model:visible="open" modal header="Create Card">
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
import DiagramEdit from '@/components/DiagramEdit.vue';
import InputText from 'primevue/inputtext';
import MatchingInput from '@/components/MatchingInput.vue';

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
    value: 'cloze',
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
const { form, values, clear } = useForm({
  type: {
    type: 'select',
    options: question_types,
    icon: FolderPen,
    value: question_types[0].value,
    required: true,
    removable: false,
    placeholder: 'Name',
    movable: false,
    editable: false,
  },
  question: {
    type: 'text',
    icon: FolderPen,
    value: null,
    required: true,
    removable: false,
    placeholder: 'Name',
    show: (form) => !(['cloze'] as Card['type'][]).includes(form['type'].value),
  },
  true_false: {
    label: 'Answer',
    name: 'answer',
    type: 'checkbox',
    icon: FolderPen,
    value: false,
    show: (form) => form['type'].value === 'true-false',
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
    label: 'shuffle',
    value: false,
    type: 'checkbox',
    icon: Shuffle,
    show: (form) => form['type'].value === 'multiple-choice',
  },
  clozeSegments: {
    label: 'Answer',
    component: ClozeEdit,
    show: (form) => form['type'].value === 'cloze',
  },
  short_answer: {
    name: 'answer',
    label: 'Answer',
    type: 'longtext',
    show: (form) => form['type'].value === 'short-answer',
  },
  essay: {
    name: 'answer',
    label: 'Answer',
    type: 'longtext',
    show: (form) => form['type'].value === 'essay',
  },
  matching: {
    name: 'answer',
    label: 'Answer',
    component: MatchingInput,
    show: (form) => form['type'].value === 'matching',
  },
  diagram: {
    name: 'answer',
    label: 'Answer',
    component: DiagramEdit,
    show: (form) => form['type'].value === 'diagram',
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
  (e: 'create', value: CreateCardDto): void;
}

const emit = defineEmits<Emits>();

const open = useVModel(props, 'open', emit);
</script>
