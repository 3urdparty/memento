<template>
  <div>
    <CreateDrawer v-model:open="open" @submit="fetchDrawers" />
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
      <li v-for="(_, idx) in drawers">
        <!-- Drawer Header  -->
        <DrawerItem v-model="drawers[idx]" />
      </li>
    </ul>
    <div class="mt-10">
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
import { ref, reactive, onMounted } from 'vue';
import { Drawer } from '../../../../src/drawers/schema/drawer.schema';
import Badge from '@/components/Badge.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import CreateDrawer from './partials/CreateDrawer.vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { object, string } from 'yup';
import { DatabaseIcon, Pen, Pencil, Plus, Spade, Trash } from 'lucide-vue-next';
import EditInput from '@/components/EditInput.vue';
import { instance } from '@/axios/instance';
import Deck from './partials/Deck.vue';
import { Input } from 'postcss';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from '@/components/Button.vue';
import DrawerItem from './partials/Drawer.vue';
import { DrawerService } from '@/services/DrawerService';
const query = reactive({
  search: '',
});

const drawers = ref<Drawer[]>([]);
onMounted(() => {
  DrawerService.getDrawers().then((res) => {
    drawers.value = res.data;
  });
});
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

const { execute: requestCreateDrawer } = useAxios<Drawer>(
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
  requestCreateDrawer({
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
