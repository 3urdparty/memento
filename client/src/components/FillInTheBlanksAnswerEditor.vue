<template>
  <div class="w-full rounded-md bg-slate-950 border border-slate-600">
    <div
      class="w-full border-b rounded-t-md border-slate-600 bg-slate-800 py-2"
    >
      <button @click="addBlank" class="px-4 text-green-400">
        <Stamp class="w-5 h-5" />
      </button>
    </div>
    {{ text }}
    <div
      v-html="text"
      :modelValue="text"
      contenteditable="true"
      @keypress="handleKeyPress"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { Stamp } from 'lucide-vue-next';
import { ref } from 'vue';

const text = ref('<div></div>');

const addBlank = () => {
  text.value +=
    '<input class="bg-transparent border-slate-600 border-b rounded-none text-sm active:ring-0" style="resize:horizontal; width:200px" />';
};
const handleKeyPress = (e: KeyboardEvent) => {
  e.preventDefault();
  if (e.key === 'Enter') {
    text.value += '<br />';
  }
  text.value += e.key;

  (e.target as HTMLInputElement).selectionStart = (
    e.target as HTMLInputElement
  ).selectionStart = text.value.length;
};
</script>
