<template>
  <div class="label">
    <em>{{ t('filter') }}</em>
    <fieldset class="filter-grade">
      <label v-for="grade in GRADES" :key="grade">
        <input
          v-model="grades"
          :value="grade"
          :class="['filter-grade__input', grade]"
          type="checkbox">
      </label>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Grade } from '/@/types';

const props = defineProps<{ modelValue: Grade[] }>();
const emit = defineEmits<{(e: 'update:modelValue', value: Grade[]): void}>();

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];

const grades = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.filter-grade {
  display: flex;
  gap: 0.125rem;

  &__input {
    all: unset;
    display: inline-block;
    height: 1rem;
    width: 1rem;
    background: var(--color, #f0f0f0);
    border-radius: 0.125rem;
    cursor: pointer;
    transform: scale(0.7);
    opacity: 0.75;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      opacity: 1;
      transform: scale(0.6);
    }

    &:checked {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
