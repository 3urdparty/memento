<template>
  <!-- TODO: Proper CSS classes when a card is disabled -->
  <BaseCard :flashcard="flashcard">
    <ul
      class="grid gap-6 mt-4"
      :class="{
        'grid-cols-4': maximised,
        'grid-cols-1': !maximised,
      }"
      v-if="flashcard.type == 'Multiple Choice'"
    >
      <li v-for="(option, idx) in flashcard.options">
        <button
          :disabled="disabled"
          @click="
            currentOption = option.value;
            emits('answer', option.isCorrect, option.value);
          "
          class="rounded-lg p-4 mt-4 border-2 hover:bg-white/10 hover:text-slate-400 transition w-full group text-lg flex flex-col items-center justify-between border gap-4 h-full min-h-[300px]"
          :class="[
            option.value == currentOption && option.isCorrect
              ? 'border-green-400 text-green-400 bg-slate-300/10 ring ring-green-400 ring-offset-4 ring-offset-slate-900'
              : option.value == currentOption && !option.isCorrect
                ? 'border-red-400 text-red-400 bg-slate-300/10'
                : 'border-slate-500/50 text-slate-500',
          ]"
        >
          <div class="flex items-center justify-between w-full">
            <kbd
              class="inline-flex items-center rounded border border-gray-200 font-sans text-xs text-gray-400 py-2 border-slate-600 px-3"
              >{{ ['Q', 'W', 'R', 'T'][idx] }}</kbd
            >
            <span>
              {{ option.value }}
            </span>
            <span class="w-6">
              <CheckCircleIcon
                v-if="option.value == currentOption && option.isCorrect"
                class="h-7 w-7 text-green-400"
              />

              <XCircleIcon
                v-else-if="option.value == currentOption && !option.isCorrect"
                class="h-7 w-7 text-red-400"
              />
            </span>
          </div>
          <img
            :src="option.imgPath"
            v-if="option.imgPath"
            alt=""
            class="rounded-lg opacity-80 group-hover:opacity-100 transition"
          />
          <span />
        </button>
      </li>
    </ul>
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@/views/review/partials/BaseCard.vue';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
interface Props {
  flashcard: App.Models.Flashcard;
  disabled: boolean;
  maximised: boolean;
}
interface Emits {
  (e: 'answer', correct: boolean, option: string): void;
}
const emits = defineEmits<Emits>();
withDefaults(defineProps<Props>(), {
  disabled: false,
});
const currentOption = ref('');
</script>
