<template>
  <div class="inline-flex rounded-md shadow-sm">
    <Button class="rounded-r-none text-sm">
      <FileUp class="w-5 h-5" />
    </Button>
    <Menu as="div" class="relative -ml-px block">
      <MenuButton>
        <Button class="rounded-l-none">
          <span class="sr-only">Open options</span>

          <ChevronDown class="h-5 w-5" aria-hidden="true" />
        </Button>
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem
              v-for="item in items"
              :key="item.name"
              v-slot="{ active }"
            >
              <a
                :href="item.href"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                >{{ item.name }}</a
              >
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import Button from './Button.vue';
import { ChevronDown, FileUp } from 'lucide-vue-next';

const items = [
  { name: 'Save and schedule', href: '#' },
  { name: 'Save and publish', href: '#' },
  { name: 'Export PDF', href: '#' },
];
</script>
