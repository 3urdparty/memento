<template>
  <div class="bg-slate-700 pb-1.5 rounded-lg">
    <div class="rounded-lg overflow-clip bg-slate-900 border border-slate-600">
      <ContextMenu ref="cm" :model="menuModel" @hide="selectedCard = null" />
      <DataTable
        :value="data"
        stripedRows
        v-model:filters="filters"
        paginator
        :rows="10"
        :globalFilterFields="['question', 'name', 'category']"
        filter
        editMode="row"
        @row-edit-save="onRowEditSave"
        v-model:selection="selectedCards"
        contextMenu
        v-model:contextMenuSelection="selectedCard"
        @rowContextmenu="onRowContextMenu"
        lazy
        scrollable
        class="rounded-lg overflow-clip"
        :first="first"
      >
        <template #empty>
          <div class="w-full flex items-center gap-2">
            <Club />
            No Cards found.
          </div>
        </template>
        <template #header>
          <div class="flex items-center justify-end gap-2">
            <!-- @vue-ignore -->
            <SearchBar placeholder="Search Cards" v-model="filters.global" />

            <Button
              label="Export"
              @click="exportCSV($event)"
              class="text-sm"
              severity="info"
            >
              <FileDown class="w-5 h-5" />
            </Button>
            <SplitButton
              label="Export"
              @click="exportCSV($event)"
              severity="warning"
              :items="items"
            >
              <FileDown class="w-5 h-5" />
              Import
            </SplitButton>

            <Button
              @click="emit('delete', selectedCards)"
              class="text-sm"
              severity="error"
            >
              <Trash class="w-5 h-5" />
            </Button>
            <Button @click="emit('create')" class="text-sm">
              <Plus class="w-5 h-5" />
            </Button>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="question" header="Question"></Column>
        <Column field="answer" header="Answer"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="tags" header="Tags"></Column>
        <ColumnGroup type="footer">
          <Row>
            <Column
              footer="Totals:"
              :colspan="3"
              footerStyle="text-align:right"
            />
            <Column :footer="10 + ''" />
            <Column :footer="30 + ''" />
          </Row>
        </ColumnGroup>
      </DataTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import DataTable, {
  DataTableRowContextMenuEvent,
  DataTableRowEditSaveEvent,
} from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Button from '@/components/Button.vue';
import SearchBar from '@/components/SearchBar.vue';
import { Club, FileDown, FileUp, Plus, Trash } from 'lucide-vue-next';
import SplitButton from '@/components/SplitButton.vue';
import { CardDocument } from '@backend/cards/schemas/card.schema';

interface Props {
  data: CardDocument[];
}
interface Emits {
  (e: 'create'): void;
  (e: 'delete', cards: CardDocument[]): void;
}
const emit = defineEmits<Emits>();

defineProps<Props>();

const first = ref(0);
const filters = reactive({
  global: '',
});
const onRowEditSave = (e: DataTableRowEditSaveEvent) => {
  console.log(e);
};

const viewCard = (card: App.Models.Flashcard) => {
  console.log(card);
};

const deleteCard = (card: App.Models.Flashcard) => {
  console.log(card);
};

const cm = ref();
const menuModel = ref([
  {
    label: 'View',

    // @ts-ignore
    command: () => viewCard(selectedCard),
  },
  {
    label: 'Delete',
    // @ts-ignore
    command: () => deleteCard(selectedCard),
  },
]);
const exportCSV = (event: MouseEvent) => {
  console.log(event);
};

const onRowContextMenu = (event: DataTableRowContextMenuEvent) => {
  cm.value.show(event.originalEvent);
};
const selectedCards = ref([]);
const selectedCard = ref<App.Models.Flashcard | null>(null);

const items = [
  { name: 'Save and schedule', href: '#' },
  { name: 'Save and publish', href: '#' },
  { name: 'Export PDF', href: '#' },
];
</script>
