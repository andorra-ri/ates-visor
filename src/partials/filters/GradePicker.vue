<template>
  <Picker v-model="grades" :options="GRADES">
    <template #option="{ option }">
      <span :class="['grade', option]">
        {{ t('grade.' + option) }}
      </span>
    </template>
  </Picker>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Picker } from '/@/components';
import type { Grade } from '/@/types';

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];

const grades = defineModel<Grade[]>({ required: true });

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.grade {
  color: var(--color);
  background: color-mix(in srgb, var(--color) 20%, transparent);
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  margin: 0 1px;
  border-radius: 0.25rem;
  cursor: pointer;

  :checked + & {
    background: var(--color);
    color: var(--text);
  }
}
</style>
