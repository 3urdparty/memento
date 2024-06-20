<template>
  <Card class="bg-slate-700">
    <div
      class="h-[25rem] w-full p-8 border border-slate-600 rounded-lg items-start flex flex-col gap-6"
    >
      <div class="w-full">
        <div class="flex gap-2 items-center">
          <Badge v-for="(tag, idx) in flashcard.tags" :key="idx">
            {{ tag.name }}
          </Badge>
        </div>
        <span class="flex gap-1.5 items-center" v-if="flashcard.callout">
          <SparklesIcon
            class="h-7 w-7 bg-green-400 text-white rounded-lg p-1.5"
          />
          <span class="font-medium text-green-400 text-lg">
            {{ flashcard.callout }}</span
          >
        </span>
        <div
          class="flex items-center mt-2 gap-3 justify-center border-b border-slate-700 pb-8"
        >
          <p class="text-slate-400 font-bold text-4xl">
            <span v-katex:auto="{ options }" class="w-fit pl-1.5">
              {{ flashcard.question }}
            </span>
          </p>
          <slot name="right" />
        </div>
      </div>

      <div
        class="grid grid-cols-2 w-full gap-2"
        v-if="flashcard.type == 'multiple-choice'"
      >
        <TransitionGroup>
          <Button
            v-for="(option, idx) in flashcard.options"
            :key="idx"
            class="py-6"
            :severity="severityOptions[idx % severityOptions.length]"
          >
            <div class="flex items-center gap-3">
              <Checkbox :inputId="idx" name="category" :value="option.name" />

              <span class="capitalize">
                {{ option.name }}
              </span>
            </div>
          </Button>
        </TransitionGroup>
      </div>

      <div
        class="grid grid-cols-2 w-full gap-2"
        v-else-if="flashcard.type == 'true-false'"
      >
        <TransitionGroup>
          <li
            v-for="(option, idx) in [{ name: 'True' }, { name: 'False' }]"
            :key="idx"
            class="flex align-items-center w-full border border-slate-600 rounded-md py-3 px-3 gap-4 justify-between"
          >
            <div class="flex items-center gap-3">
              <Checkbox :inputId="idx" name="category" :value="option.name" />

              <span class="capitalize">
                {{ option.name }}
              </span>
            </div>
          </li>
        </TransitionGroup>
      </div>

      <div
        v-else-if="flashcard.type == 'cloze'"
        class="flex items-baseline gap-2 justify-center w-full"
      >
        <div v-for="cloze in flashcard.clozeSegments">
          <InputText v-if="cloze.type == 'cloze'" size="small" />
          <span class="" v-else>
            {{ cloze.value }}
          </span>
        </div>
      </div>

      <div
        v-else-if="
          flashcard.type == 'short-answer' || flashcard.type == 'essay'
        "
        class="flex items-baseline gap-2 justify-center w-full h-full"
      >
        <Textarea class="w-full h-full resize-none" autoresize />
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import { CardDocument } from '@backend/cards/schemas/card.schema';
import Card from './Card.vue';
import { DeckDocument } from '@backend/decks/schemas/deck.schema';
import { TransitionGroup } from 'vue';
import Checkbox from 'primevue/checkbox';
import Badge from './Badge.vue';
import { SparklesIcon } from 'lucide-vue-next';
import InputText from 'primevue/inputtext';
import Button from './Button.vue';
interface Props {
  flashcard: CardDocument;
  showDeck: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showDeck: true,
});
import { severityOptions } from '@/components/Button.vue';
import Textarea from 'primevue/textarea';
</script>
