<template>
  <div class="grid grid-cols-2 w-full gap-x-[5rem] gap-y-4">
    <TransitionGroup>
      <li
        v-for="(option, idx) in options"
        :key="idx"
        class="flex align-items-center w-full border border-slate-600 rounded-md py-3 px-3 gap-10 justify-between relative"
      >
        <span
          class="w-4 h-4 rounded-full bg-green-400 top-0 mt-3.5 absolute"
          :class="{
            '-right-1.5': option.side === 'left',
            '-left-2': option.side === 'right',
          }"
        ></span>
        <div>{{ option.name }}</div>
      </li>
    </TransitionGroup>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Props {}
const props = defineProps<Props>();
const options = ref([
  {
    name: 'Option 1',
    value: 'option1',
    side: 'left',
    connection: 'Option 1',
  },

  {
    name: 'Option 1',
    value: 'option1',
    side: 'right',
    connection: 'Option 1',
  },
  {
    name: 'Option 1',
    value: 'option1',
    side: 'left',
    connection: 'Option 1',
  },
  {
    name: 'Option 1',
    value: 'option1',
    side: 'right',
    connection: 'Option 1',
  },
  {
    name: 'Option 1',
    value: 'option1',
    side: 'left',
    connection: 'Option 1',
  },
]);
</script>
