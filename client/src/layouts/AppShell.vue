<template>
  <div class="bg-slate-900 h-full max-h-2xl selection:bg-green-400">
    <Toast />

    <ConfirmDialog></ConfirmDialog>
    <div
      class="top-0 sticky z-20 select-none"
      :class="{
        '-translate-y-14 hover:translate-y-0 transition ease-in-out ': !open,
      }"
    >
      <CommandPalette v-model:open="palette.open" />
      <div
        class="bg-gradient-to-b from-slate-950 to-slate-900/0 pt-6 pb-4"
        v-if="showNavbar"
      >
        <Disclosure as="nav" v-slot="{ open }">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between">
              <div class="flex">
                <div class="-ml-2 mr-2 flex items-center md:hidden">
                  <!-- Mobile menu button -->
                  <DisclosureButton
                    class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span class="absolute -inset-0.5" />
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon
                      v-if="!open"
                      class="block h-6 w-6"
                      aria-hidden="true"
                    />
                    <XMarkIcon
                      v-else
                      class="block h-6 w-6"
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                </div>
                <div class="flex flex-shrink-0 items-center">
                  <RouterLink to="/" class="group">
                    <Logo
                      class="w-8 text-green-300/80 group-hover:text-green-300 transition"
                    />
                  </RouterLink>
                </div>
                <div
                  class="hidden md:ml-6 md:flex md:items-center md:space-x-2"
                >
                  <RouterLink
                    :to="item.href"
                    v-for="item in navigation"
                    :key="item.name"
                    :class="[
                      currentRoute.fullPath === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-slate-800 hover:text-white',
                      'rounded-lg transition flex items-center justify-center h-10 w-14',
                    ]"
                    :aria-current="
                      currentRoute.fullPath == item.href ? 'page' : undefined
                    "
                  >
                    <component :is="item.icon" />
                  </RouterLink>

                  <RouterLink
                    to="/review"
                    key="review"
                    variant="hole"
                    :class="{
                      'bg-gray-900 text-white h-13':
                        currentRoute.fullPath === '/review',
                      'text-gray-300 hover:bg-slate-800 hover:text-white h-10':
                        currentRoute.fullPath !== '/review',
                    }"
                    class="rounded-lg transition flex items-center justify-center h-10 w-14"
                    :aria-current="
                      currentRoute.fullPath == '/review/' ? 'page' : undefined
                    "
                  >
                    <Target class="h-6 w-6 text-gray-300" aria-hidden="true" />
                  </RouterLink>
                </div>
              </div>
              <div class="flex items-center">
                <div class="flex-shrink-0"></div>
                <div
                  class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center gap-2"
                >
                  <!-- TODO: Add Locale Change Functionality-->
                  <button
                    class="rounded-lg transition flex items-center justify-center w-14 text-gray-300 hover:bg-slate-800 hover:text-white h-10"
                  >
                    <Languages class="h-5 w-5" aria-hidden="true" />
                  </button>
                  <!-- TODO: Add Theme Change Functionality -->
                  <button
                    class="rounded-lg transition flex items-center justify-center w-14 text-gray-300 hover:bg-slate-800 hover:text-white h-10"
                  >
                    <Eclipse class="h-5 w-5" aria-hidden="true" />
                  </button>
                  <!-- TODO: Show Notifications Panel  -->
                  <button
                    class="rounded-lg transition flex items-center justify-center w-14 text-gray-300 hover:bg-slate-800 hover:text-white h-10"
                  >
                    <Bell class="h-5 w-5" aria-hidden="true" />
                    <Badge v-if="user" :value="user?.notifications.length" />
                  </button>

                  <!-- Profile dropdown -->
                  <div class="text-white"></div>
                  <AvatarDropDown :avatar="user?.avatar" />
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel class="md:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <DisclosureButton
                v-for="item in navigation"
                :key="item.name"
                as="a"
                :href="item.href"
                :class="[
                  currentRoute.fullPath === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                ]"
                :aria-current="
                  currentRoute.fullPath === item.href ? 'page' : undefined
                "
                >{{ item.name }}</DisclosureButton
              >
            </div>
            <div class="border-t border-gray-700 pb-3 pt-4">
              <div class="flex items-center px-5 sm:px-6">
                <div class="flex-shrink-0">
                  <AvatarDropDown showStatus v-bind="user?.avatar" />
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-white">
                    {{ user.name }}
                  </div>
                  <div class="text-sm font-medium text-gray-400">
                    {{ user.email }}
                  </div>
                </div>
                <button
                  type="button"
                  class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-3 space-y-1 px-2 sm:px-3">
                <DisclosureButton
                  v-for="item in userNavigation"
                  :key="item.name"
                  as="a"
                  :href="item.href"
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >{{ item.name }}</DisclosureButton
                >
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
    <div>
      <main class="text-slate-400">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import Logo from '@/assets/Logo.svg?component';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { WalletCards, Target, Bell, Eclipse, Languages } from 'lucide-vue-next';
import { reactive, ref, watch } from 'vue';
import AvatarDropDown from './AvatarDropDown.vue';
import Button from '@/components/Button.vue';
import CommandPalette from '@/components/CommandPalette.vue';
import { onKeyStroke, useMagicKeys } from '@vueuse/core';
import Toast from 'primevue/toast';
import Badge from 'primevue/badge';
import { User } from '@backend/users/schemas/user.schema';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ConfirmDialog from 'primevue/confirmdialog';

interface Props {
  showNavbar: boolean;
  user: User | null;
}
const props = withDefaults(defineProps<Props>(), {
  showNavbar: true,
  user: null,
});
const open = ref(true);
const currentRoute = useRoute();

const navigation = [{ name: 'Decks', href: '/decks', icon: WalletCards }];

const palette = reactive({ open: false });

const keys = useMagicKeys();
const shiftCtrlA = keys['Meta+k'];

watch(shiftCtrlA, (v) => {
  if (v) {
    palette.open = !palette.open;
  }
});
</script>
