<template>
  <button
    class="flex items-center gap-2 border-b-4 rounded-md px-2.5 py-2 transition group"
    :class="class"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  class: string;
}
const props = withDefaults(defineProps<Props>(), {
  class:
    'border-green-600 bg-green-400 hover:bg-green-300 hover:text-green-700',
});
</script>
