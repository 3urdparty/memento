<template>
  <div v-if="deck" class="pb-14">
    <DiagramEdit />
    <CreateDialog
      v-model:open="createDialogOpen"
      :deck="deck"
      @create="createCard"
    />
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
      <Card class="bg-slate-700" v-if="deck.cards.length == 0">
        <div
          class="h-80 w-full p-8 border border-slate-600 rounded-lg flex items-center justify-center"
        >
          <div class="flex items-center gap-2">
            <Rabbit class="w-8 h-8" />
            <span class="mt-2.5"> No cards in this deck </span>
          </div>
        </div>
      </Card>

      <Flashcard :flashcard="deck.cards[currentCardIndex]" v-else />

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
          <Button
            :disabled="deck.cards.length == 0"
            @click="currentCardIndex >= 1 && currentCardIndex--"
          >
            <div class="p-0.5 text-white">
              <ArrowLeft class="w-5 h-5" />
            </div>
          </Button>
          <p class="text-slate-400" v-if="deck.total == 0">
            <span class="font-bold"> -/- </span>
          </p>
          <p class="text-slate-400" v-else>
            <span class="font-bold">
              {{ currentCardIndex + 1 }}
            </span>
            / {{ deck.total }}
          </p>

          <Button
            :disabled="deck.cards.length == 0"
            @click="
              currentCardIndex < deck.cards.length - 1 && currentCardIndex++
            "
          >
            <div class="p-0.5 text-white">
              <ArrowRight class="w-5 h-5" />
            </div>
          </Button>
        </div>

        <div class="flex items-center gap-2">
          <OverlayPanel ref="op">
            <ul>
              <li class="flex items-center gap-2">
                Enable
                <InputSwitch :modelValue="true" />
              </li>
            </ul>
          </OverlayPanel>
          <Button @click="toggle">
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
      <CardTable
        :data="deck.cards"
        @create="createDialogOpen = true"
        @delete="confirmDelete"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
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

import Button from '@/components/Button.vue';
import DifficultyLevel from '@/components/DifficultyLevel.vue';
import Badge from '@/components/Badge.vue';
import Card from '@/components/Card.vue';
import { Avatar } from 'vue3-avataaars';
import CardTable from './partials/CardTable.vue';
import { DeckDocument } from '@backend/decks/schemas/deck.schema';
import { DecksService } from '@/services/DecksService';
import CreateDialog from '../cards/partials/CreateDialog.vue';
import { CreateCardDto } from '@backend/cards/dto/create-card.dto';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import OverlayPanel from 'primevue/overlaypanel';
import InputSwitch from 'primevue/inputswitch';
import { CardDocument } from '@backend/cards/schemas/card.schema';
import { CardsService } from '@/services/CardsService';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import Flashcard from '@/components/Flashcard.vue';
import DiagramEdit from '@/components/DiagramEdit.vue';

interface Props {
  slug: string;
}
const props = defineProps<Props>();
const currentCardIndex = ref(0);

const md = ref('Test');
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

const createCard = (newCard: CreateCardDto) => {
  console.log(newCard);
  if (!deck.value) return;
  console.log('Creating Card', newCard);
  console.log(deck.value._id);
  DecksService.createCard(deck.value._id, newCard)
    .then(({ data }) => {
      createDialogOpen.value = false;
      if (!deck.value) return;
      deck.value.cards.push(data);
    })
    .catch((e) => {
      console.error(e);
    });
};

const toggle = (event: Event) => {
  op.value.toggle(event);
};

const op = ref();

const toast = useToast();

const confirm = useConfirm();
const confirmDelete = (cards: CardDocument[]) => {
  if (cards.length === 0) return;
  confirm.require({
    message: `Do you want to delete ${cards.length} card(s)?`,
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteCards(cards);
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      });
    },
  });
};
const deleteCards = (cards: CardDocument[]) => {
  console.log('Deleting Cards', cards);
  CardsService.deleteCards(cards.map((c) => c._id))
    .then(() => {
      if (!deck.value) return;
      deck.value.cards = deck.value.cards.filter(
        (c) => !cards.map((c) => c._id).includes(c._id),
      );
      toast.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Cards have been deleted',
        life: 3000,
      });
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>
