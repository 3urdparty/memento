<template>
  <!-- drawer component -->
  <Sidebar v-model:visible="open" position="right" class="w-full max-w-xl">
    <template #header>
      <div class="flex items-center gap-10">
        <div class="flex items-center gap-1">
          <Spade class="w-5 h-6 text-slate-400" />
          <h2 id="drawer-label" class="ml-2 text-lg font-semibold">New Deck</h2>
        </div>

        <Button
          class="bg-yellow-400 border-yellow-600 hover:bg-yellow-300"
          v-tooltip="'Toggle Edit Mode'"
          @click="editMode = !editMode"
        >
          <Pen v-if="!editMode" class="w-4 h-4 text-yellow-600" />
          <Save class="w-4 h-4 text-yellow-600" v-else />
        </Button>
      </div>
    </template>
    <div
      class=""
      tabindex="-1"
      aria-labelledby="drawer-label"
      aria-hidden="true"
    >
      <div>
        <Form v-model="form" v-model:errors="errors" />

        <div class="flex justify-end mt-4">
          <Button
            @click="createDeck"
            type="button"
            class="rounded-md bg-green-400 px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 border-green-600 hover:bg-green-300 text-green-800 hover:text-green-900"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  </Sidebar>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  Angry,
  Annoyed,
  FlagIcon,
  FolderPen,
  Frown,
  Meh,
  Pen,
  Save,
  Smile,
  Spade,
} from 'lucide-vue-next';
import { useVModel } from '@vueuse/core';
import Sidebar from 'primevue/sidebar';
import { Deck, Field } from '@backend/decks/schemas/deck.schema';
import Button from '@/components/Button.vue';
import { DecksService } from '@/services/DecksService';

interface Props {
  open: boolean;
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'submit'): void;
}
const emits = defineEmits<Emits>();
const open = useVModel(props, 'open', emits);

const difficulties = [
  { name: 'Easy', value: 'easy', icon: Smile },
  { name: 'Medium', value: 'medium', icon: Meh },
  { name: 'Hard', value: 'hard', icon: Annoyed },
  { name: 'Very Hard', value: 'very hard', icon: Frown },
  { name: 'Expert', value: 'expert', icon: Angry },
];

const { form, values } = useForm({
  name: {
    type: 'text',
    icon: FolderPen,
    value: null,
    required: true,
    removable: false,
    placeholder: 'Name',
    movable: false,
    editable: false,
    default: 'Chapter 1',
  },

  coverImage: {
    name: 'Cover Image',
    value: null as File | null,
    type: 'file',
  },
  difficulty: {
    type: 'select',
    icon: FlagIcon,
    value: null,
    required: true,
    removable: false,
    placeholder: 'Select your difficulty',
    movable: false,
    editable: false,
    default: 'easy',
    options: difficulties,
  },
  contributors: {
    type: 'users',
    value: [],
  },
  description: {
    type: 'longtext',
    value: ' ',
  },
  tags: {
    value: [],
    type: 'multiselect',
    options: [{ name: 'Computer Science', value: 'computerscience' }],
  },
});

const errors = ref<{ [key: string]: string }>({});

import { useToast } from 'primevue/usetoast';
import FormField from '@/components/FormField.vue';
import Form from '@/components/Form.vue';
import { useForm } from '@/composables/form';
import { CreateDeckDto } from '@backend/decks/dto/create-deck.dto';

const toast = useToast();
const createDeck = () => {
  console.log('Creating deck', form);
  errors.value = {};
  console.log(form);
  DecksService.createDeck(values())
    .then((response) => {
      open.value = false;
      emits('submit');
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Deck '${(response.data as Deck).name}' created successfully`,
        life: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
      errors.value = error.response.data;
    });
};

const mapObject = (obj: { [key: string]: Field }) => {
  let result: { [key: string]: string | File | string[] } = {};
  for (const key in obj) {
    result[key] = obj[key].value;
  }
  return result;
};

const editMode = ref(true);
</script>
