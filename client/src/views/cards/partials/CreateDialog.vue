<template>
  <Dialog
    v-model:visible="open"
    modal
    header="Edit Profile"
    :style="{ width: '25rem' }"
  >
    Test
  </Dialog>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import { useVModel } from '@vueuse/core';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
const visible = ref(true);

interface Props {
  open: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:open', value: boolean): void;
}

const emit = defineEmits<Emits>();

const open = useVModel(props, 'open', emit);
</script>
