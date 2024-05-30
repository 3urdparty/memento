<template>
  <div class="flex items-baseline gap-0.5">
    <span
      class="w-1.5 h-2 rounded-sm border border-slate-400"
      :class="[
        level >= 1 ? 'bg-green-500 border-green-300' : 'bg-slate-500/40',
      ]"
    >
    </span>

    <span
      :class="[
        level >= 2 ? 'bg-yellow-400 border-yellow-300' : 'bg-slate-400/20',
      ]"
      class="w-1.5 h-3.5 rounded-sm border border-slate-400 bg-slate-400/20"
    >
    </span>

    <span
      class="w-1.5 h-5 rounded-sm border-slate-400 border"
      :class="[level >= 3 ? 'bg-red-500 border-red-300' : 'bg-slate-400/20']"
    >
    </span>
  </div>
</template>
<script setup lang="ts">
import { Deck } from '@backend/decks/schemas/deck.schema';
import { computed } from 'vue';

interface Props {
  difficulty: Deck['difficulty'];
}

const props = withDefaults(defineProps<Props>(), {
  difficulty: 'hard',
});
const level = computed(() => {
  switch (props.difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 1;
  }
});
</script>
