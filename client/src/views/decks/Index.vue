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
        <DrawerItem
          v-model="drawers[idx]"
          @save="updateDrawer"
          @add="open = true"
          @delete="deleteDrawer"
        />
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
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import CreateDrawer from './partials/CreateDrawer.vue';
import Button from '@/components/Button.vue';
import DrawerItem from './partials/Drawer.vue';
import { DrawerService } from '@/services/DrawerService';
const query = reactive({
  search: '',
});

const drawers = ref<Drawer[]>([]);
onMounted(() => {
  fetchDrawers();
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

const createDrawer = () => {
  DrawerService.createDrawer({
    name: 'Algorithms analysis and design',
    description: 'Subject at UNI',
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
const updateDrawer = (drawer: Drawer) => {
  DrawerService.updateDrawer(drawer)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      fetchDrawers();
    });
};

const fetchDrawers = () => {
  DrawerService.getDrawers().then((res) => {
    drawers.value = res.data;
  });
};

const deleteDrawer = (drawer: Drawer) => {
  DrawerService.deleteDrawer(drawer)
    .then(() => {})
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      fetchDrawers();
    });
};
</script>
