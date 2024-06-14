<template>
  <TransitionRoot :show="open" as="template" @after-leave="query = ''" appear>
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-slate-500 bg-opacity-25 transition-opacity"
        />
      </TransitionChild>

      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-3xl transform divide-y divide-slate-500 divide-opacity-20 overflow-hidden rounded-xl bg-slate-900 border-b-[5px] pb-4 border-green-400/80 shadow-2xl transition-all"
          >
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-slate-500"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  @change="query = $event.target.value"
                  @blur="query = ''"
                />
              </div>

              <ComboboxOptions
                v-if="query === '' || filteredProjects.length > 0"
                static
                as="ul"
                class="max-h-80 scroll-py-2 divide-y divide-slate-500 divide-opacity-20 overflow-y-auto"
              >
                <li class="p-2">
                  <h2
                    v-if="query === ''"
                    class="mb-2 mt-4 px-3 text-xs font-semibold text-slate-200"
                  >
                    Recent searches
                  </h2>
                  <ul class="text-sm text-slate-400">
                    <ComboboxOption
                      v-for="project in query === ''
                        ? recent
                        : filteredProjects"
                      :key="project.id"
                      :value="project"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="[
                          'flex cursor-default select-none items-center rounded-md px-3 py-2',
                          active && 'bg-slate-800 text-white',
                        ]"
                      >
                        <FolderIcon
                          :class="[
                            'h-6 w-6 flex-none',
                            active ? 'text-white' : 'text-slate-500',
                          ]"
                          aria-hidden="true"
                        />
                        <span class="ml-3 flex-auto truncate">{{
                          project.name
                        }}</span>
                        <span
                          v-if="active"
                          class="ml-3 flex-none text-slate-400"
                          >Jump to...</span
                        >
                      </li>
                    </ComboboxOption>
                  </ul>
                </li>
                <li v-if="query === ''" class="p-2">
                  <h2 class="sr-only">Quick actions</h2>
                  <ul class="text-sm text-slate-400">
                    <ComboboxOption
                      v-for="action in quickActions"
                      :key="action.shortcut"
                      :value="action"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="[
                          'flex cursor-default select-none items-center rounded-md px-3 py-2',
                          active && 'bg-slate-800 text-white',
                        ]"
                      >
                        <component
                          :is="action.icon"
                          :class="[
                            'h-6 w-6 flex-none',
                            active ? 'text-green-400' : 'text-slate-500',
                          ]"
                          aria-hidden="true"
                        />
                        <span
                          class="ml-3 flex-auto truncate"
                          :class="[
                            active ? 'text-green-400' : 'text-slate-400',
                          ]"
                          >{{ action.name }}</span
                        >
                        <span
                          class="ml-3 flex-none text-xs font-semibold"
                          :class="[
                            active ? 'text-green-400' : 'text-slate-400',
                          ]"
                        >
                          <kbd class="font-sans">⌘</kbd>
                          <kbd class="font-sans">{{ action.shortcut }}</kbd>
                        </span>
                      </li>
                    </ComboboxOption>
                  </ul>
                </li>
              </ComboboxOptions>

              <div
                v-if="query !== '' && filteredProjects.length === 0"
                class="px-6 py-14 text-center sm:px-14"
              >
                <FolderIcon
                  class="mx-auto h-6 w-6 text-slate-500"
                  aria-hidden="true"
                />
                <p class="mt-4 text-sm text-slate-200">
                  We couldn't find any projects with that term. Please try
                  again.
                </p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
import {
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  HashtagIcon,
  TagIcon,
} from '@heroicons/vue/24/outline';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useVModels } from '@vueuse/core';

const projects = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', url: '#' },
  // More projects...
];
const recent = [projects[0]];
const quickActions = [
  { name: 'Add new file...', icon: DocumentPlusIcon, shortcut: 'N', url: '#' },
  { name: 'Add new folder...', icon: FolderPlusIcon, shortcut: 'F', url: '#' },
  { name: 'Add hashtag...', icon: HashtagIcon, shortcut: 'H', url: '#' },
  { name: 'Add label...', icon: TagIcon, shortcut: 'L', url: '#' },
];

const query = ref('');
const filteredProjects = computed(() =>
  query.value === ''
    ? []
    : projects.filter((project) => {
        return project.name.toLowerCase().includes(query.value.toLowerCase());
      }),
);

function onSelect(item: any) {
  window.location = item.url;
}
interface Props {
  open: boolean;
}
interface Emits {
  (e: 'update:open', value: boolean): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { open } = useVModels(props, emits);
</script>
