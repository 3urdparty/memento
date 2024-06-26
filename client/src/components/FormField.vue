<template>
  <div>
    <label
      v-if="showLabel"
      for="difficulty"
      class="mb-2 text-sm font-medium text-slate-900 dark:text-white flex items-center capitalize justify-between"
    >
      <div class="flex items-center">
        <button
          v-if="movable"
          class="text-slate-500 hover:text-slate-400"
          type="button"
        >
          <GripVertical class="w-4 h-4 mr-1" aria-hidden="true" />
        </button>

        <button class="text-slate-500 hover:text-slate-400" type="button">
          <component
            v-if="icon && showIcon"
            :is="icon"
            :class="{
              'text-red-400': !!error,
            }"
            class="w-4 h-4 mr-2"
            aria-hidden="true"
          />
          <Brush class="w-4 h-4 mr-2" aria-hidden="true" v-else />
        </button>

        <input
          type="text"
          :disabled="!(editable && editMode)"
          class="bg-transparent border-none outline-none focus:ring-0 text-sm px-0 py-0 capitalize"
          :value="name"
        />
      </div>

      <button
        type="button"
        class="hover:text-slate-400 text-slate-500"
        v-if="editable"
      >
        <Pencil class="w-3.5" />
      </button>
      <button
        type="button"
        class="hover:text-slate-400 text-red-500/80"
        v-if="removable"
      >
        <Trash class="w-3.5" />
      </button>
    </label>

    <component
      :is="component"
      v-if="component"
      v-model="modelValue"
      :invalid="!!error"
    />
    <InputText
      v-model="modelValue"
      class="w-full"
      :invalid="!!error"
      v-else-if="type == 'text'"
    />
    <DropDown
      v-model="modelValue"
      class="w-full"
      v-else-if="type == 'select'"
      :options="options as Option[]"
      :invalid="!!error"
      dataKey="value"
      inputId="difficulty"
      :placeholder="placeholder as string"
    >
    </DropDown>

    <FileUpload
      :multiple="false"
      v-else-if="type == 'file'"
      class="border-b-2 w-fit overflow-clip"
      mode="basic"
      name="demo"
      url="/api/upload"
      accept="image/*"
      :maxFileSize="5000000"
      @select="onFileSelect"
    />

    <UserSelect
      :options="users"
      class="w-full"
      :invalid="!!error"
      :loading="false"
      v-model="modelValue"
      v-else-if="type == 'users'"
    />

    <Textarea
      class="w-full"
      rows="5"
      cols="30"
      :invalid="!!error"
      v-model="modelValue"
      v-else-if="type == 'longtext'"
    />

    <MultiSelect
      v-else-if="type == 'multiselect'"
      v-model="modelValue"
      :invalid="!!error"
      class="w-full"
      display="chip"
      :options="options"
      optionLabel="name"
      placeholder="Select tags"
    >
      <template #chip="{ value }">
        <div class="flex items-center">
          <span>{{ value.name }}</span>
        </div>
      </template>
    </MultiSelect>

    <Rating
      v-else-if="type == 'rating'"
      v-model="modelValue"
      class="w-full"
      :cancel="false"
      :readonly="false"
    />
    <MarkdownEditor v-else-if="type == 'markdown'" v-model="modelValue" />
    <div class="flex items-center gap-2" v-else-if="type == 'checkbox'">
      <Checkbox v-model="modelValue" binary />
      <span class="capitalize">
        {{ name }}
      </span>
    </div>

    <InputOptions v-if="type == 'inputoptions'" v-model="modelValue" />
  </div>
</template>
<script setup lang="ts">
import { Brush, GripVertical, Pencil, Trash } from 'lucide-vue-next';
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import DropDown, { Option } from './DropDown.vue';
import UserSelect from './UserSelect.vue';
import Textarea from 'primevue/textarea';
import MultiSelect from 'primevue/multiselect';
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';
import InputOptions from './InputOptions.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import Checkbox from 'primevue/checkbox';

interface Props {
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
    | 'users'
    | 'rating'
    | 'inputoptions'
    | 'markdown';
  icon?: any;
  value?: any;
  name?: string;
  required?: boolean;
  removable?: boolean;
  placeholder?: string;
  movable?: boolean;
  editable?: boolean;
  default?: string;
  options?: { name: string; value: string; icon?: any }[];
  modelValue: any;
  error: string;
  exclude?: boolean;
  component: any;
  showLabel?: boolean;
  users?: any[];
  showIcon?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
  showIcon: true,
});
interface Emits {
  (e: 'update:modelValue', value: any): void;
}
const emit = defineEmits<Emits>();
const modelValue = useVModel(props, 'modelValue', emit);

const onFileSelect = (e: FileUploadSelectEvent) => {
  modelValue.value = e.files[0];
};
const editMode = ref(false);
</script>
