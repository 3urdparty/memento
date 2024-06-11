<template>
  <div v-if="deck">
    <CreateDialog v-model:open="createDialogOpen" />
    <BreadCrumbs />
    <div class="relative">
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1 flex items-center gap-3">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ deck.name }}
          </h2>
          <div class="flex items-center mt-1 gap-2">
            <Badge
              v-for="tag in deck.tags"
              :key="tag.name"
              :color="tag.color"
              :icon="tag.icon"
              class="mr-2"
            >
              {{ tag.name }}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div
      class="text-slate-400 flex items-center gap-2 divide-x divide-slate-300/40 mt-1"
    >
      <span class="flex items-center gap-1">
        <User class="text-sm w-5 text-green-300" />
        {{ deck.recentStudents.length }}
      </span>

      <span class="pl-3">
        <Rating v-model="deck.rating" :cancel="false" readonly />
      </span>

      <div class="pl-3 capitalize flex items-center gap-1">
        <DifficultyLevel
          :difficulty="deck.difficulty as App.Models.Deck['difficulty']"
        />
        <span class="mt-0.5">
          {{ deck.difficulty }}
        </span>
      </div>
      <span> </span>
    </div>

    <p class="text-slate-400 mt-2">
      {{ deck.description }}
    </p>
    <div class="flex items-center gap-2 mt-4">
      <Button>
        <div class="text-white flex items-center gap-1">
          <Play class="w-4 h-4" />
          Practice
        </div>
      </Button>

      <Button>
        <div class="text-white flex items-center gap-1">
          <PenBox class="w-4 h-4" />
          Exam
        </div>
      </Button>
    </div>

    <div class="grid mt-4 gap-2">
      <Card class="bg-slate-700">
        <div
          class="h-80 w-full p-8 border border-slate-600 rounded-lg flex items-center justify-center"
          v-if="deck.cards.length == 0"
        >
          <div class="flex items-center gap-2">
            <Rabbit class="w-8 h-8" />
            <span class="mt-2.5"> No cards in this deck </span>
          </div>
        </div>
      </Card>
      <div class="flex items-center gap-2 justify-between mt-2">
        <div class="flex items-center gap-2">
          <Button :disabled="deck.cards.length == 0">
            <div class="p-0.5 text-white">
              <Play class="w-5 h-5" />
            </div>
          </Button>
          <Button :disabled="deck.cards.length == 0">
            <div class="p-0.5 text-white">
              <Shuffle class="w-5 h-5" />
            </div>
          </Button>
        </div>
        <div class="flex items-center gap-3">
          <Button :disabled="deck.cards.length == 0">
            <div class="p-0.5 text-white">
              <ArrowLeft class="w-5 h-5" />
            </div>
          </Button>
          <p class="text-slate-400">
            <span class="font-bold">
              {{ deck.total == 0 ? '-' : currentCardIndex + 1 }}
            </span>
            / {{ deck.total == 0 ? '-' : deck.total }}
          </p>

          <Button :disabled="deck.cards.length == 0">
            <div class="p-0.5 text-white">
              <ArrowRight class="w-5 h-5" />
            </div>
          </Button>
        </div>

        <div class="flex items-center gap-2">
          <Button>
            <div class="p-0.5 text-white">
              <Settings class="w-5 h-5" />
            </div>
          </Button>
          <Button>
            <div class="p-0.5 text-white">
              <Fullscreen class="w-5 h-5" />
            </div>
          </Button>
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center gap-2 mt-4">
        <div class="flex items-center">
          <Avatar
            v-for="contributor in deck.contributors.slice(1)"
            v-bind="contributor.avatar"
            :key="contributor.name"
            class="w-6 h-6 rounded-full opacity-80"
          />
        </div>

        <p class="text-slate-400 text-md">
          <span class="text-green-400 font-semibold">
            {{ deck.contributors.length - 1 }}
          </span>
          Contributors
        </p>
      </div>

      <div class="flex items-center text-slate-300 gap-1 mt-2">
        <Avatar v-bind="deck.contributors[0].avatar" class="w-10 h-10" />
        <div class="-space-y-1">
          <div class="text-sm font-light">Created by</div>
          <div class="text-lg font-bold text-white">
            {{ deck.contributors[0].name }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <!-- @vue-ignore -->
      <CardTable :data="deck.flashcards" @create="createDialogOpen = true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import { onMounted, reactive, ref } from 'vue';
import Rating from 'primevue/rating';
import {
  ArrowLeft,
  ArrowRight,
  Fullscreen,
  PenBox,
  Play,
  Rabbit,
  Settings,
  Shuffle,
  User,
} from 'lucide-vue-next';

const query = reactive({
  id: 1,
  difficulty: 'easy',
  imageUrl: '/src/assets/images/computational_methods.jpg',
  total: 10,
  new: 5,
  due: 3,
  leech: 2,
  suspended: 0,
  rating: 4.5,
  recentStudents: 31,
  properties: [
    {
      key: 'Chapter',
      type: 'number',
      value: 1,
    },
    {
      key: 'Code',
      type: 'text',
      value: 'CM-101',
    },
  ],
  contributors: [
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
    {
      name: 'John Doe',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      email: 'john.doe@gmail.com',
    },
  ],
  coverUrl: 'https://source.unsplash.com/random/900x700/?maths',
  name: 'Significance and Error',
  description:
    "A deck for chapter 3 of the course of Computational methods. This deck contains cards about numerical integration, including techniques like the trapezoidal rule, Simpson's rule, and Romberg algorithm, along with implementation in Octave",
  tags: [
    {
      name: 'Mathematics',
      color: 'green',
      icon: 'Maths',
    },
    {
      name: 'University',
      color: 'blue',
      icon: 'University',
    },
  ],
  flashcards: [
    {
      number: 1,
      question: 'What is the capital of France?',
      tags: [
        {
          name: 'Trivia',
          color: 'purple',
        },
      ],
      decks: [],
      type: 'Multiple Choice',
      level: 'Easy',
      callout: 'New Card',
      options: [
        {
          value: 'Paris',
          isCorrect: true,
          imgPath: 'https://source.unsplash.com/random/900x700/?paris',
        },
        {
          value: 'London',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?london',
        },
        {
          value: 'Berlin',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?berlin',
        },
        {
          value: 'Madrid',
          isCorrect: false,
          imgPath: 'https://source.unsplash.com/random/900x700/?madrid',
        },
      ],
    },
    {
      number: 2,
      question: 'Calculate $\\int{x^2}dx$',
      tags: [
        {
          name: 'Mathematics',
          color: 'green',
        },
      ],
      decks: [],
      type: 'Steps',
      level: 'Easy',
      callout: 'New Card',
    },
    {
      number: 3,
      question: 'What is the quadratic formula',
      tags: [
        {
          name: 'Mathematics',
          color: 'green',
        },
      ],
      decks: [],
      type: 'Multiple Choice',
      level: 'Easy',
      callout: 'New Card',
    },
  ],
});
import Button from '@/components/Button.vue';
import DifficultyLevel from '@/components/DifficultyLevel.vue';
import Badge from '@/components/Badge.vue';
import Card from '@/components/Card.vue';
import { Avatar } from 'vue3-avataaars';
import CardTable from './partials/CardTable.vue';
import { DeckDocument } from '@backend/decks/schemas/deck.schema';
import { DecksService } from '@/services/DecksService';
import CreateDialog from '../cards/partials/CreateDialog.vue';

interface Props {
  slug: string;
}
const props = defineProps<Props>();
const currentCardIndex = ref(0);

const deck = ref<DeckDocument | null>(null);
onMounted(() => {
  DecksService.getDeckBySlug(props.slug)
    .then((res) => {
      deck.value = res.data;
    })
    .catch((e) => {
      console.log(e);
    });
});

const createDialogOpen = ref(false);
</script>
