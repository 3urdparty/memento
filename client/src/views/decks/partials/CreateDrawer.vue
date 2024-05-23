<template>
  <!-- drawer component -->
  <Sidebar v-model:visible="open" position="right" class="w-full max-w-md">
    <template #header>
      <div class="flex items-center">
        <SquareAsterisk class="w-5 h-6 text-slate-400" />
        <h2 id="drawer-label" class="ml-2 text-lg font-semibold">New Deck</h2>
      </div>
    </template>
    <div
      class=""
      tabindex="-1"
      aria-labelledby="drawer-label"
      aria-hidden="true"
    >
      <form action="#">
        <ul class="space-y-3">
          <li v-for="(property, name) in newForm">
            <label
              for="difficulty"
              class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center capitalize justify-between"
            >
              <div class="flex items-center">
                <button
                  v-if="property.movable"
                  class="text-slate-500 hover:text-slate-400"
                  type="button"
                >
                  <GripVertical class="w-4 h-4 mr-1" aria-hidden="true" />
                </button>

                <button
                  class="text-slate-500 hover:text-slate-400"
                  type="button"
                >
                  <component
                    v-if="property.icon"
                    :is="property.icon"
                    class="w-4 h-4 mr-2"
                    aria-hidden="true"
                  />
                  <Brush class="w-4 h-4 mr-2" aria-hidden="true" v-else />
                </button>

                <input
                  type="text"
                  class="bg-transparent border-none outline-none focus:ring-0 text-sm px-0 py-0 capitalize"
                  :value="name"
                />
              </div>

              <button
                type="button"
                class="hover:text-slate-400 text-slate-500"
                v-if="property.editable"
              >
                <Pencil class="w-3.5" />
              </button>
              <button
                type="button"
                class="hover:text-slate-400 text-red-500/80"
                v-if="property.removable"
              >
                <Trash class="w-3.5" />
              </button>
            </label>
            <InputText
              v-model="newForm[name].value"
              class="w-full"
              v-if="property.type == 'text'"
            />
            <Dropdown
              v-model="newForm[name].value"
              class="w-full"
              v-if="property.type == 'select'"
              :options="property.options"
              optionLabel="name"
              placeholder="Select a difficulty"
            >
              <template #value="{ value }">
                <div v-if="value.value" class="flex items-center">
                  <div class="flex items-center gap-2">
                    <component :is="value.icon" class="w-4 h-4" />
                    {{ value.name }}
                  </div>
                </div>
                <span v-else>
                  <span class="text-slate-500 dark:text-slate-400"
                    >Select a difficulty</span
                  >
                </span>
              </template>
              <template #option="{ option }">
                <div class="flex items-center gap-1">
                  <component :is="option.icon" class="w-4 h-4 mr-2" />
                  <span>{{ option.name }}</span>
                </div>
              </template>
            </Dropdown>

            <FileUpload
              v-if="property.type == 'file'"
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              :maxFileSize="1000000"
              @upload="onUpload"
            />

            <UserSelect
              :options="users"
              class="w-full"
              :loading="false"
              v-model="newForm[name].value"
              v-if="property.type == 'users'"
            />

            <Textarea
              class="w-full"
              rows="5"
              cols="30"
              v-model="newForm[name].value"
              v-if="property.type == 'longtext'"
            />

            <MultiSelect
              v-if="property.type == 'multiselect'"
              v-model="newForm[name].value"
              class="w-full"
              display="chip"
              :options="property.options"
              optionLabel="name"
              placeholder="Select tags"
            >
              <template #chip="{ value }">
                <div class="flex items-center">
                  <span>{{ value.name }}</span>
                </div>
              </template>
            </MultiSelect>
          </li>
        </ul>
      </form>
    </div>
  </Sidebar>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import {
  Angry,
  Annoyed,
  Brush,
  FlagIcon,
  FolderPen,
  Frown,
  GripVertical,
  Meh,
  Pencil,
  Smile,
  SquareAsterisk,
  Trash,
} from 'lucide-vue-next';
import InputText from 'primevue/inputtext';
import { useVModel } from '@vueuse/core';
import Dropdown from 'primevue/dropdown';
import FileUpload, { FileUploadUploadEvent } from 'primevue/fileupload';
import UserSelect from '@/components/UserSelect.vue';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import Sidebar from 'primevue/sidebar';

const users: App.Models.User[] = [
  {
    name: 'John Doe',
    imageUrl:
      'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'john.doe@gmail.com',
    verified: true,
    password: 'MeinLeben2003+',
  },
];
type Field = {
  type:
    | 'text'
    | 'longtext'
    | 'number'
    | 'multiselect'
    | 'date'
    | 'time'
    | 'datetime'
    | 'color'
    | 'range'
    | 'file'
    | 'checkbox'
    | 'select'
    | 'users';
  icon?: any;
  value?: any;
  required?: boolean;
  removable?: boolean;
  placeholder?: string;
  movable?: boolean;
  editable?: boolean;
  default?: string;
  options?: { name: string; value: string; icon?: any }[];
};
type Form = {
  [key: string]: Field;
};
const newForm = reactive<Form>({
  name: {
    type: 'text',
    icon: FolderPen,
    value: 'Chapter 1',
    required: true,
    removable: false,
    placeholder: 'Name',
    movable: false,
    editable: false,
    default: 'Chapter 1',
  },
  difficulty: {
    type: 'select',
    icon: FlagIcon,
    value: 'easy',
    required: true,
    removable: false,
    placeholder: 'Difficulty',
    movable: false,
    editable: false,
    default: 'easy',
    options: [
      { name: 'Easy', value: 'easy', icon: Smile },
      { name: 'Medium', value: 'medium', icon: Meh },
      { name: 'Hard', value: 'hard', icon: Annoyed },
      { name: 'Very Hard', value: 'very hard', icon: Frown },
      { name: 'Expert', value: 'expert', icon: Angry },
    ],
  },
  cover: {
    type: 'file',
    value: '',
  },
  contributors: {
    type: 'users',
    value: [],
  },
  description: {
    type: 'longtext',
    value: '',
  },
  tags: {
    type: 'multiselect',
    options: [{ name: 'Computer Science', value: 'computerscience' }],
  },
});
const onUpload = (e: FileUploadUploadEvent) => {
  console.log(e);
};

interface Props {
  open: boolean;
}
const props = defineProps<Props>();
interface Emits {
  (e: 'update:open', value: boolean): void;
}
const emits = defineEmits<Emits>();
const open = useVModel(props, 'open', emits);
</script>
