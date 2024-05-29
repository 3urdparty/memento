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
      <div>
        <ul class="space-y-3">
          {{
            form
          }}
          <li v-for="(property, name) in form">
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
              v-model="form[name].value"
              class="w-full"
              v-if="property.type == 'text'"
            />
            <DropDown
              v-model="form[name].value"
              class="w-full"
              v-if="property.type == 'select'"
              :options="property.options as Option[]"
              dataKey="value"
              inputId="difficulty"
              :placeholder="property.placeholder as string"
            >
            </DropDown>

            <FileUpload
              :multiple="false"
              v-if="property.type == 'file'"
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              :maxFileSize="5000000"
              @select="onFileSelect"
            />

            <UserSelect
              :options="users"
              class="w-full"
              :loading="false"
              v-model="form[name].value"
              v-if="property.type == 'users'"
            />

            <Textarea
              class="w-full"
              rows="5"
              cols="30"
              v-model="form[name].value"
              v-if="property.type == 'longtext'"
            />

            <MultiSelect
              v-if="property.type == 'multiselect'"
              v-model="form[name].value"
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

        <div class="flex justify-end mt-4">
          <button
            @click="createDeck"
            type="button"
            class="rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </Sidebar>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
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
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import UserSelect from '@/components/UserSelect.vue';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import Sidebar from 'primevue/sidebar';
import { useAxios } from '@vueuse/integrations/useAxios.mjs';
import { instance } from '@/axios/instance';
import { array, object, string } from 'yup';
import { UserService } from '@/services/UserService';
import { Deck, Field } from '@backend/decks/schemas/deck.schema';
import { User } from '@backend/users/schemas/user.schema';
import DropDown, { Option } from '@/components/DropDown.vue';

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

const form = reactive<{ [key: string]: Field }>({
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

  coverImage: {
    name: 'Cover Image',
    value: null as File | null,
    type: 'file',
  },
  difficulty: {
    type: 'select',
    icon: FlagIcon,
    value: 'easy',
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
  rating: {
    value: 4,
    type: 'rating',
  },
});

const onFileSelect = (e: FileUploadSelectEvent) => {
  console.log(e);
  form.coverImage.value = e.files[0];
};

const users = ref<User[]>([]);

onMounted(() => {
  UserService.getUsers().then((response) => {
    users.value = response.data;
  });
});

let DeckSchema = object({
  name: string().required(),
  description: string().required(),
  tags: array().of(object()),
});

const errors = ref<string[]>([]);

const createDeck = () => {
  const formValues = mapObject(form);

  DeckSchema.validate(formValues)
    .then((value) => {
      console.log(value);
    })
    .catch((e) => {
      console.warn(e.errors);
    });

  const formData = new FormData();

  for (const key in formValues) {
    formData.append(key, formValues[key] as string | File);
  }
  instance
    .post('/decks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function () {
      console.log('SUCCESS!!');
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      open.value = false;
      emits('submit');
    });
};

const mapObject = (obj: { [key: string]: Field }) => {
  let result: { [key: string]: string | File | string[] } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      result[key] = element.value;
    }
  }
  return result;
};
</script>
