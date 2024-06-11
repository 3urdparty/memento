<template>
  <button
    class="flex items-center gap-2 border-b-4 rounded-md px-2.5 py-2 transition group cursor-pointer"
    :class="{
      'bg-gray-400  border-gray-600 cursor-not-allowed': disabled,
      'bg-green-400 hover:bg-green-300 hover:text-green-700 border-green-600':
        severity === 'success' && !disabled,
      'bg-blue-400 hover:bg-blue-300 hover:text-blue-700 border-blue-600':
        severity === 'info' && !disabled,
      'bg-yellow-400 hover:bg-yellow-300 hover:text-yellow-700 border-yellow-600':
        severity === 'warning' && !disabled,
      'bg-red-400 hover:bg-red-300 hover:text-red-700 border-red-600':
        severity === 'error' && !disabled,
    }"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  severity?: 'success' | 'info' | 'warning' | 'error';
  disabled?: boolean;
}
withDefaults(defineProps<Props>(), {
  severity: 'success',
  disabled: false,
});
</script>
