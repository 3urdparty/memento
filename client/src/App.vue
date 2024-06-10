<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';

import AppShell from './layouts/AppShell.vue';
const { meta } = useRoute();
</script>

<template>
  <AppShell v-if="!meta.hideLayout">
    <template #main>
      <RouterView />
    </template>
  </AppShell>
  <RouterView v-else />
</template>
