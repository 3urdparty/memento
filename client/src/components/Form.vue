<template>
  <ul class="space-y-3 pb-6">
    <li v-for="(property, name) in form">
      <div
        v-if="
          typeof property.show === 'function'
            ? property.show(form)
            : property.show !== false
        "
      >
        <FormField
          v-bind="property"
          v-model="form[name].value"
          :error="errors[name]"
          :name="property.label ?? name"
        />
        <span class="text-red-400 text-sm">
          {{ errors[name] }}
        </span>
      </div>
    </li>
    <slot name="end" :form="modelValue" />
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormField from './FormField.vue';
import { Field } from '@backend/decks/schemas/deck.schema';
import { useVModel, useVModels } from '@vueuse/core';
import Drauu from './Drauu.vue';
interface Props {
  modelValue: Record<string, Field>;
  errors: Record<string, string>;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => ({}),
});
interface Emits {
  (e: 'update:modelValue', value: any): void;
  (e: 'update:errors', value: any): void;
}

const emits = defineEmits<Emits>();

const { modelValue: form, errors } = useVModels(props, emits);
</script>
