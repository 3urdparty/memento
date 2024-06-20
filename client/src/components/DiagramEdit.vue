<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { toRefs } from '@vueuse/core';
import { useDrauu } from '@vueuse/integrations/useDrauu';
import FileUpload from 'primevue/fileupload';
import { useMotionProperties, useSpring } from '@vueuse/motion';
import Button from './Button.vue';
import {
  Brackets,
  Eraser,
  ImageMinus,
  Minus,
  PaintBucket,
  Pen,
  Redo2,
  ScissorsLineDashed,
  Spline,
  Tangent,
  Undo2,
} from 'lucide-vue-next';
import ColorPicker from 'primevue/colorpicker';
import { useGesture } from '@vueuse/gesture';

const imageEl = ref<HTMLImageElement>();
const onSelect = (e) => {
  console.log(e);
  const file = e.files[0];
  load(file);
};

const colors = reactive({
  preset: [
    { value: '#000000' },
    { value: '#ffffff' },
    { value: '#ff0000' },
    { value: '#00ff00' },
    { value: '#0000ff' },
    { value: '#ffff00' },
    { value: '#ff00ff' },
    { value: '#00ffff' },
  ],
  picker: '#000000',
});

const tools = ref([
  {
    value: 'brush',
    name: 'Brush',
    icon: Pen,

    description: 'Erase ⌘Z',
  },
  {
    value: 'eraser',
    name: 'Eraser',
    icon: Eraser,
    description: 'Erase ⌘Z',
  },
  {
    value: 'fill',
    name: 'Fill',
    icon: PaintBucket,
    description: 'Erase ⌘Z',
  },
  {
    value: 'line',
    name: 'Line',
    icon: Minus,
    description: 'Erase ⌘Z',
  },

  {
    value: 'cut',
    name: 'Cut',
    icon: ScissorsLineDashed,
    description: 'Erase ⌘Z',
  },
  {
    value: 'spline',
    name: 'Spline',
    icon: Spline,
    description: 'Erase ⌘Z',
  },
  {
    value: 'tangent',
    name: 'Tangent',
    icon: Tangent,
    description: 'Erase ⌘Z',
  },

  {
    value: 'remove-bg',
    name: 'Remove Background',
    icon: ImageMinus,
    description: 'Remove Background ⌘Z',
  },

  {
    value: 'cloze',
    name: 'Cloze',
    icon: Brackets,
    description: 'Add Cloze ⌘Z',
  },
]);

const selectedColor = ref(colors.preset[0]);
const selectedTool = ref(tools.value[0]);
const diagramEl = ref(null);
const canvasEl = ref(null);
const { undo, redo, canUndo, canRedo, brush, load } = useDrauu(canvasEl);
onMounted(() => {
  addEventListener('gesturestart', (e) => {
    if (e.target === canvasEl.value) {
      e.preventDefault();
    }
  });
});

onUnmounted(() => {
  removeEventListener('gesturestart', (e) => {
    if (e.target === canvasEl.value) {
      e.preventDefault();
    }
  });
});

const { motionProperties } = useMotionProperties(imageEl, {
  cursor: 'grab',
  zoom: 1,
  rotateZ: 0,
});
const { set } = useSpring(motionProperties, { delay: 0, duration: 100 });
useGesture(
  {
    onPinch: ({ offset: [d, a], pinching, ...pinch }) => {
      const change = d < -50 ? -50 : d > 200 ? 200 : d;
      set({ scale: 1 + change / 75, rotateZ: a });
    },
  },
  {
    domTarget: canvasEl,
  },
);

// Bind the motion properties to a spring reactive object.
</script>

<template>
  <FileUpload @select="onSelect" :multi="false" ref="diagramEl">
    <template
      #header="{ chooseCallback, uploadCallback, clearCallback, files }"
    >
      <div
        class="flex flex-wrap justify-between items-center flex-1 gap-4 w-full"
      >
        <div class="flex gap-2">
          <Button @click="chooseCallback()">
            <span>Choose</span>
          </Button>
          <Button
            @click="uploadEvent(uploadCallback)"
            :disabled="!files || files.length === 0"
            >Upload</Button
          >
          <Button
            @click="clearCallback()"
            :disabled="!files || files.length === 0"
          >
            Clear
          </Button>

          <Button
            @click="clearCallback()"
            :disabled="!files || files.length === 0"
          >
            Remove Background
          </Button>

          <Button @click="" :disabled="!files || files.length === 0">
            Input
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <button @click="undo" :disabled="canUndo">
            <Undo2 />
          </button>
          <button @click="redo" :disabled="canRedo">
            <Redo2 />
          </button>
        </div>
      </div>
    </template>
    <template #content="{ files }">
      <div
        class="h-full bg-slate-900 rounded-b-lg border-slate-700 border-b relative"
      >
        <div
          class="absolute divide-x divide-slate-700 z-50 bg-slate-800 top-0 -left-px grid grid-cols-2"
        >
          <!--  Tools -->
          <div
            class="flex flex-col p-4 items-center gap-4 w-16 overflow-scroll"
          >
            <button
              v-for="tool in tools"
              @click="selectedTool = tool"
              class="rounded-full p-2"
              :class="{
                'bg-green-400 hover:bg-green-300 ring-4 border border-green-400 ring-green-500/30 ring-offset-slate-900 transition':
                  tool.value === selectedTool.value,
                'bg-slate-950 hover:bg-slate-800 border-transparent border hover:border-green-400':
                  tool.value !== selectedTool.value,
              }"
              v-tooltip="tool.description"
            >
              <component
                :is="tool.icon"
                class="w-5 h-5 text-slate-700"
                alt=""
              />
            </button>
          </div>

          <!--  Secondary Toolbar -->
          <div
            class="flex flex-col gap-2 p-4 items-center w-14 overflow-scroll"
            v-if="['brush'].includes(selectedTool.value)"
          >
            <button
              v-for="color in colors.preset"
              :class="{
                'border-2 border-green-400':
                  color.value === selectedColor.value,
              }"
              @click="
                selectedColor = color;
                brush.color = color.value;
              "
              class="rounded-md h-8 w-8 border-slate-600 border"
              :style="{ backgroundColor: color.value }"
            ></button>

            <!-- Add New Color  -->
            <ColorPicker format="hex" v-model="colors.picker" />
          </div>
        </div>
        <div class="relative h-full w-full bg-white">
          <img
            ref="imageEl"
            class="w-full h-full absolute object-contain rounded-br-lg bg-white"
            :alt="files.length > 0 ? files[0].name : 'Image Placeholder'"
            src="/src/assets/example.jpg"
          />

          <svg
            ref="canvasEl"
            class="absolute w-full h-full z-40 left-0 top-0 overflow-scroll"
          />
        </div>
      </div>
    </template>
  </FileUpload>
</template>
