<template>
  <span
    v-if="variant === 'red'"
    class="inline-flex items-center rounded-md bg-gray-400/80 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-400/20"
  >
    <slot />
  </span>
  <span
    v-else-if="variant === 'yellow'"
    class="inline-flex items-center rounded-md bg-red-400/80 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20"
    ><slot
  /></span>
  <span
    v-else-if="variant === 'green'"
    class="inline-flex items-center rounded-md bg-yellow-400/80 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20"
    ><slot
  /></span>
  <span
    v-if="variant === 'blue'"
    class="inline-flex items-center rounded-md bg-green-500/80 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20"
    ><slot
  /></span>
  <span
    v-else-if="variant === 'indigo'"
    class="inline-flex items-center rounded-md bg-blue-400/80 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-400/30"
    ><slot
  /></span>
  <span
    v-else-if="variant === 'purple'"
    class="inline-flex items-center rounded-md bg-indigo-400/80 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30"
    ><slot
  /></span>
  <span
    v-else-if="variant === 'pink'"
    class="inline-flex items-center rounded-md bg-purple-400/80 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-400/30"
    ><slot
  /></span>
  <span
    v-else
    class="inline-flex items-center rounded-md bg-pink-400/80 px-2 py-1 text-xs font-medium text-pink-400 ring-1 ring-inset ring-pink-400/20"
    ><slot
  /></span>
</template>
<script setup lang="ts">
interface Props {
  variant?: 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
}
withDefaults(defineProps<Props>(), {
  variant: 'blue',
});
</script>
