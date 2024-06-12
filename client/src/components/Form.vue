<template>
  <ul class="space-y-3 pb-6">
    <li v-for="(property, name) in form">
      <FormField
        v-bind="property"
        v-model="form[name].value"
        :error="errors[name]"
        :name="property.name ?? name"
      />
      <span class="text-red-400 text-sm">
        {{ errors[name] }}
      </span>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormField from './FormField.vue';
import { Field } from '@backend/decks/schemas/deck.schema';
import { useVModel, useVModels } from '@vueuse/core';
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
