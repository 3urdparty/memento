<template>
  <div
    class="relative bg-slate-900 rounded border-slate-600 border min-h-[75px] focus-within:border-green-400/80 focus-within:ring-4 ring-green-400/30"
  >
    <div
      class="min-h-lg px-2 py-2 w-full flex items-center gap-1 justify-between absolute z-0"
    >
      <div>
        <slot name="left-toolbar"></slot>
      </div>
      <div>
        <slot name="center-toolbar"></slot>
      </div>
      <div>
        <slot name="right-toolbar">
          <Button
            class="!p-1.5"
            :class="{
              'opacity-75 hover:opacity-100': !metaE,
            }"
            @click="preview = !preview"
          >
            <CodeXmlIcon v-if="preview" class="w-5 h-5 text-white" />
            <FileCode v-else class="w-5 h-5 text-white" />
          </Button>
        </slot>
      </div>
    </div>
    <VueShowdown
      v-if="preview"
      :markdown="modelValue"
      flavor="allOn"
      :options="options"
      :extensions="extensions"
      :vue-template-components="components"
      :vue-template-data="data"
      :vue-template="true"
      class="text-sm p-3.5 py-3 pb-5 rounded min-h-[70px] border-0 selection:bg-green-400 relative z-10"
    />

    <textarea
      class="w-full relative z-10 bg-transparent resize-none text-white bg-slate-900 h-full rounded focus:outline-none focus:ring-0 focus:border-0 border-0 selection:bg-green-400"
      v-model="modelValue"
      ref="textareaEl"
      v-else="!preview"
    />
  </div>
</template>
<script setup lang="ts">
import { useMagicKeys, useVModel, whenever } from '@vueuse/core';
import Button from '@/components/Button.vue';
import Textarea from 'primevue/textarea';
import showdownKatex from 'showdown-katex';
import { VueShowdown } from 'vue-showdown';
import { CodeXmlIcon, FileCode } from 'lucide-vue-next';
import { ref, nextTick } from 'vue';
import { BlanksExtension } from '@/extensions/component';
import InputText from 'primevue/inputtext';
interface Props {
  modelValue: string;
  data: Record<string, any>;
  options: Record<string, any>;
  components: Record<string, any>;
}
const props = withDefaults(defineProps<Props>(), {
  components: () => ({
    InputText,
  }),
});
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();

const preview = ref(false);
const extensions = [
  BlanksExtension(),
  showdownKatex({
    delimiters: [
      { left: '$', right: '$', display: false, asciimath: false, latex: true },
      {
        left: '$$',
        right: '$$',
        display: false,
        asciimath: false,
        latex: true,
      },
      { left: '~', right: '~', display: false, asciimath: true },
      { left: '~~', right: '~~', display: true, asciimath: true },
    ],
  }),
];

const textareaEl = ref<HTMLTextAreaElement | null>(null);
const modelValue = useVModel(props, 'modelValue', emit);

const keys = useMagicKeys();
const metaE = keys['Meta+E'];

whenever(metaE, async () => {
  preview.value = !preview.value;
  await nextTick();
  textareaEl.value?.focus();
});
</script>
