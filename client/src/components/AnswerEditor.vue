<script setup lang="ts">
import type { VNodeRef } from 'vue';
import { useNodeViewFactory } from '@prosemirror-adapter/vue';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';

const nodeViewFactory = useNodeViewFactory();

const editorRef: VNodeRef = (element) => {
  const el = element as HTMLElement;
  if (!el || el.firstChild) return;

  const editorView = new EditorView(el, {
    state: EditorState,
    nodeViews: {
      paragraph: nodeViewFactory({
        component: 'p',
        // Optional: add some options
        as: 'div',
        contentAs: 'p',
      }),
    },
  });
};
</script>

<template>
  <div :ref="editorRef" class="editor" />
</template>
