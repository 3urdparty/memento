<template>
  <Card>
    <div>
      <div class="relative h-40">
        <img
          :src="deck.coverUrl"
          class="object-cover w-full h-full -mt-1"
          v-if="deck.coverUrl"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <Spade class="h-20 w-20 text-green-400/40" />
        </div>
        <div class="w-full bottom-0 absolute px-2 pb-2 flex items-center gap-2">
          <span
            v-for="property in deck.properties"
            class="bg-slate-600/95 border border-green-400 py-1 text-green-400 rounded-md text-sm px-2 shadow-sm"
          >
            {{ property.value }}
          </span>
        </div>
        <div
          class="absolute w-full bg-gradient-to-t from-slate-700/40 to-slate-400/0 bottom-0 h-20"
        />
      </div>
      <div
        class="flex items-center gap-2 border border-slate-400/50 rounded-md bg-slate-400/20 shadow-sm w-fit px-2 divide-x divide-slate-400/50 mt-3 ml-3"
      >
        <span class="flex items-center pr-1">
          <Check class="h-4 text-green-400" />
          {{ deck.new }}
        </span>

        <span class="flex items-center px-1">
          <Repeat class="h-4 text-yellow-400" />
          {{ deck.due }}
        </span>

        <span class="flex items-center pl-1">
          <RectangleVertical class="h-4 text-blue-400" />
          {{ deck.total }}
        </span>
      </div>
      <div class="px-2 pb-3">
        <div class="flex items-baseline justify-between w-full pr-2">
          <RouterLink :to="`/decks/${deck.slug}`" class="w-full">
            <h1
              class="text-xl mt-2 pl-1 font-medium hover:text-green-400/80 transition"
            >
              {{ deck.name }}
            </h1>
          </RouterLink>
          <DifficultyLevel :difficulty="deck.difficulty" />
        </div>
        <dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
          <div class="flex -space-x-0.5 mt-2 pl-2">
            <dt class="sr-only">Contributors</dt>
            <span
              v-for="(contributor, idx) in deck.contributors.slice(0, 3)"
              :key="idx"
            >
              <Avatar v-bind="contributor.avatar" class="w-8 h-8" />
            </span>
          </div>
          <div class="flex w-16 gap-x-2.5">
            <dt>
              <span class="sr-only">Total comments</span>
            </dt>
          </div>
        </dl>
        <p
          class="text-slate-300/60 text-sm font-thin mt-2 h-20 text-ellipsis overflow-hidden"
        >
          {{ deck.description }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import { Check, Repeat, RectangleVertical, Spade } from 'lucide-vue-next';
import DifficultyLevel from '@/components/DifficultyLevel.vue';
import { RouterLink } from 'vue-router';
import { Deck } from '@backend/decks/schemas/deck.schema';
import { Avatar, Factory } from 'vue3-avataaars';

const avatarProps = Factory({
  isCircle: true,
});
interface Props {
  deck: Deck;
}
defineProps<Props>();
</script>
