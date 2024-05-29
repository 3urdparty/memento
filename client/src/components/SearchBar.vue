<template>
  <div class="mt-3 sm:ml-4 sm:mt-0">
    <label for="mobile-search-candidate" class="sr-only">Search</label>
    <label for="desktop-search-candidate" class="sr-only">Search</label>
    <div class="flex rounded-md shadow-sm border border-slate-600">
      <div class="relative flex-grow focus-within:z-10">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <MagnifyingGlassIcon
            class="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:hidden"
          placeholder="Search"
        />
        <input
          type="text"
          name="desktop-search-candidate"
          id="desktop-search-candidate"
          class="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-slate-900 placeholder:text-slate-400 focus:ring-2 ring-offset-2 ring-offset-slate-800 focus:outline-none focus:border-none focus:ring-green-400 sm:block transition"
          :placeholder="placeholder"
          v-model="search"
        />
      </div>
      <button
        type="button"
        class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md bg-slate-800 px-3 py-2 text-sm font-semibold ring-offset-2 ring-offset-slate-900 hover:ring-2 ring-green-400/90 hover:bg-slate-700 transition border-slate-600 shadow-sm text-slate-400"
      >
        <BarsArrowUpIcon
          class="-ml-0.5 h-5 w-5 text-slate-400"
          aria-hidden="true"
        />
        Sort
        <ChevronDownIcon
          class="-mr-1 h-5 w-5 text-slate-400"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
} from '@heroicons/vue/20/solid';
import { useVModel } from '@vueuse/core';
interface Props {
  search: string;
  placeholder?: string;
}
interface Emits {
  (e: 'update:search', search: string): void;
}
const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search',
});
const search = useVModel(props, 'search', emits);
</script>
