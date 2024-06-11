<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import AppShell from './layouts/AppShell.vue';
const route = useRoute();
</script>

<template>
  <AppShell :showNavbar="!route.meta.hideLayout">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </AppShell>
</template>
