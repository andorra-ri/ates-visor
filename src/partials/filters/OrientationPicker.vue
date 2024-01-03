<template>
  <Picker v-model="orientations" :options="ORIENTATIONS">
    <template #option="{ option }">
      <span class="chip">{{ option }}</span>
    </template>
  </Picker>
</template>

<script setup lang="ts">
import { Picker } from '/@/components';
import type { Orientation } from '/@/types';

const ORIENTATIONS: Orientation[] = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];

const orientations = defineModel<Orientation[]>({ required: true });
</script>

<style lang="scss" scoped>
.picker { display: flex; }

.chip {
  --color: #888b;

  font-size: 0.8rem;
  padding: 0.25rem 0.35rem;
  cursor: pointer;

  :checked + & { --color: var(--color-primary); }
}
</style>
