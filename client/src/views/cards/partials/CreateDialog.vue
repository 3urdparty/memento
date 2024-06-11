<template>
  <Dialog
    v-model:visible="open"
    modal
    header="Create Card"
    :style="{ width: '25rem' }"
  >
    <Form v-model="form" />
    <Button @click="createCard">
      <Plus class="w-5 h-5" />
      Create
    </Button>
  </Dialog>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form from '@/components/Form.vue';
import { useForm } from '@/composables/form';
import { Field } from '@backend/decks/schemas/deck.schema';
import { CardsService } from '@/services/CardsService';
import { useVModel } from '@vueuse/core';
import { FolderPen, Plus } from 'lucide-vue-next';
import Dialog from 'primevue/dialog';

const { form, values } = useForm({
  type: {
    type: 'select',
    options: [
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
    ],
    icon: FolderPen,
    value: null,
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
  },
  answer: {
    type: 'text',
    icon: FolderPen,
    value: null,
    required: true,
    placeholder: 'Answer',
  },
});
interface Props {
  open: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:open', value: boolean): void;
}

const emit = defineEmits<Emits>();

const open = useVModel(props, 'open', emit);

const createCard = () => {
  console.log(values());
  CardsService.createCard(values())
    .then(() => {
      open.value = false;
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>
