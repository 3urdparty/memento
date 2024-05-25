<template>
  <div>
    <CreateDrawer v-model:open="open" />
    <div>
      <BreadCrumbs />
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            My Decks
          </h2>
        </div>

        <SearchBar v-model:search="query.search" />
      </div>
    </div>

    <ul class="mt-4">
      <!-- Drawer Section -->
      <li v-for="drawer in drawers">
        <!-- Drawer Header  -->
        <div class="border-b border-slate-200/50 pb-5">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2 w-1/3">
              <!-- Title -->
              <EditInput v-model="drawer.name" />
              <!-- Tags -->
              <Badge v-for="tag in drawer.tags"> {{ tag.name }}</Badge>
            </div>

            <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
              <button
                @click="open = true"
                type="button"
                class="ml-3 inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                <Plus class="w-5 h-5 text-slate-200" />
              </button>
            </div>
          </div>

          <!-- Description -->
          <!-- <Textarea v-model="drawer.description" class="w-full mt-2" v-model="drawer.description"/> -->
          <p class="mt-2 max-w-4xl text-sm text-slate-500">
            {{ drawer.description }}
          </p>
        </div>
        <ul class="grid grid-cols-4 mt-4 gap-4">
          <li v-for="deck in drawer.decks">
            <!-- <Deck :deck="deck" /> -->
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <button
        @click="createDrawer"
        type="button"
        class="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
      >
        Add Drawer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Drawer } from '../../../../src/drawers/schema/drawer.schema';
import Badge from '@/components/Badge.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import CreateDrawer from './partials/CreateDrawer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { DatabaseIcon, Plus, Spade } from 'lucide-vue-next';
import EditInput from '@/components/EditInput.vue';
import Textarea from 'primevue/textarea';
import { instance } from '@/axios/instance';
const query = reactive({
  search: '',
});

const { data: drawers, execute: fetchDrawers } = useAxios<Drawer[]>(
  '/drawers',
  instance,
);
const open = ref(false);
export interface Property {
  name: string;
  value: string;
  type:
    | 'text'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime'
    | 'color'
    | 'range'
    | 'file'
    | 'checkbox'
    | 'select';
}

const { execute } = useAxios<Drawer>(
  '/drawers',
  {
    method: 'POST',
  },
  instance,
  {
    immediate: false,
  },
);
const createDrawer = () => {
  execute({
    data: {
      icon: 'icon',
      name: 'Algorithms analysis and design',
      description: 'Subject at UNI',
    },
  })
    .then(() => {
      console.log('Sent');
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      fetchDrawers();
    });
};
</script>
