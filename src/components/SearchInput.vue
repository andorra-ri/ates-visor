<template>
  <label class="label">
    <em>{{ t('search') }}</em>
    <input
      v-model="searchFor"
      :placeholder="props.placeholder || t('search_placeholder')"
      size="10"
      type="text">
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { normalize } from '/@/utils';

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: string): void}>();

const searchFor = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', normalize(value)),
});

const { t } = useI18n();
</script>
