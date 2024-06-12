<template>
  <!-- TODO: Add Experience Bar  -->

  <Menu as="div" class="relative ml-3 text-white">
    <div>
      <MenuButton
        class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span class="absolute -inset-1.5" />
        <span class="sr-only">Open user menu</span>
        <div class="relative min-w-9 h-full">
          <Avatar v-bind="avatar" class="h-full w-auto" />
          <span
            v-if="showStatus"
            class="w-2 h-2 rounded-full absolute right-0 top-0 mt-0.5 mr-0.5 border border-white"
            :class="{
              'animate-pulse  bg-green-500/80': status === 'online',
              'bg-gray-400': status === 'offline',
              'bg-yellow-400': status === 'away',
            }"
          />
        </div>
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="item in userNavigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <button
            @click="item.onClick"
            class="w-full flex items-center justify-start"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
          >
            {{ item.name }}
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup lang="ts">
import { useAuth } from '@/composables/auth';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const { logout } = useAuth();
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/login', onClick: logout },
];

interface Props {
  avatar: IAvatarProps;
  status: 'online' | 'offline' | 'away';
  showStatus: boolean;
}
withDefaults(defineProps<Props>(), {
  status: 'offline',
  showStatus: false,
});
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Avatar, Factory, IAvatarProps } from 'vue3-avataaars';
type Status = 'online' | 'offline' | 'away';
const status = ref<Status>('online');
</script>
