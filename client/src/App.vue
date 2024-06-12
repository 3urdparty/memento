<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import AppShell from './layouts/AppShell.vue';
const route = useRoute();
import { useAuth } from '@/composables/auth';
const { user } = useAuth();
</script>

<template>
  <AppShell :showNavbar="!route.meta.hideLayout" :user="user">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </AppShell>
</template>
