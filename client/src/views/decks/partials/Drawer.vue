<template>
  <div>
    <div class="border-b border-slate-200/50 pb-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 w-1/3 h-10">
          <!-- Title -->
          <InputText v-model="drawer.name" v-if="editMode" class="w-2/3" />
          <h1 v-else class="">
            {{ drawer.name }}
          </h1>
          <!-- Tags -->
          <Badge v-for="tag in drawer.tags"> {{ tag.name }}</Badge>
        </div>

        <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0 gap-2">
          <Button
            class="bg-yellow-400 border-yellow-600 hover:bg-yellow-300"
            v-tooltip="'Toggle Edit Mode'"
            @click="
              editMode = !editMode;
              if (!editMode) emits('save', drawer);
            "
          >
            <Pen v-if="!editMode" class="w-4 h-4 text-yellow-600" />
            <Save class="w-4 h-4 text-yellow-600" v-else />
          </Button>
          <Button @click="emits('add')" type="button" v-tooltip="'Add Deck'">
            <Plus class="w-5 h-5 text-green-600" />
          </Button>

          <Button
            @click="emits('delete', drawer)"
            type="button"
            v-tooltip="'Add Deck'"
            class="bg-red-400 border-red-600 hover:bg-red-300"
          >
            <Trash class="w-5 h-5 text-red-600" />
          </Button>
        </div>
      </div>

      <!-- Description -->
      <Textarea
        v-if="editMode"
        :auto-resize="false"
        v-model="drawer.description"
        class="w-full mt-2 resize-none"
      />
      <p v-else>
        {{ drawer.description }}
      </p>
    </div>

    <ul class="grid grid-cols-4 mt-4 gap-4" v-if="drawer.decks">
      <li v-for="deck in drawer.decks">
        <slot name="deck" :deck="deck">
          <Deck :deck="deck" />
        </slot>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from '@/components/Button.vue';
import { Drawer } from '@backend/drawers/schema/drawer.schema';
import { useVModel } from '@vueuse/core';
import { Pen, Plus, Save, Trash } from 'lucide-vue-next';
import Badge from '@/components/Badge.vue';
import Textarea from 'primevue/textarea';
import Deck from './Deck.vue';
import { ref } from 'vue';

interface Props {
  modelValue: Drawer;
}
interface Emits {
  (e: 'add'): void;
  (e: 'delete', value: Drawer): void;
  (e: 'update:modelValue', value: Drawer): void;
  (e: 'save', value: Drawer): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const drawer = useVModel(props, 'modelValue', emits);
const editMode = ref(false);
</script>
