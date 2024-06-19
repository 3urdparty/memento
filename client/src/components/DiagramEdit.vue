<script setup lang="ts">
import { ref } from 'vue';
import { toRefs } from '@vueuse/core';
import { useDrauu } from '@vueuse/integrations/useDrauu';

const target = ref();
const { undo, redo, canUndo, canRedo, brush, load } = useDrauu(target);
const { color, size } = toRefs(brush);
import FileUpload from 'primevue/fileupload';
const onSelect = (e) => {
  console.log(e);
  const file = e.files[0];
  load(file);
};
</script>

<template>
  <div>
    <FileUpload @select="onSelect">
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <div>
          <!-- <img -->
          <!--   v-if="files[0]" -->
          <!--   role="presentation" -->
          <!--   :alt="files[0].name" -->
          <!--   :src="files[0].objectURL" -->
          <!-- /> -->
        </div>
      </template>
    </FileUpload>
    <svg ref="target" />
  </div>
</template>
