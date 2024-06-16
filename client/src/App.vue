<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import AppShell from './layouts/AppShell.vue';
const route = useRoute();
import { useAuth } from '@/composables/auth';
import BreadCrumbs from './components/BreadCrumbs.vue';
import { useFavicon } from '@vueuse/core';
const { user } = useAuth();
</script>

<template>
  <AppShell :showNavbar="!route.meta.hideLayout" :user="user">
    <BreadCrumbs v-if="!route.meta.hideBreadcrumbs" />
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </AppShell>
</template>
