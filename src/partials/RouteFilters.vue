<template>
  <Dropdown>
    <template #toggler>
      <slot name="toggler" :active="active" />
    </template>
    <TableList :title="t('route.filters')">
      <template #footer>
        <button class="button" @click="clear">
          {{ t('clear', [t('route.filters')]) }}
        </button>
      </template>
      <li>
        <em>{{ t('route.fields.grade') }}</em>
        <GradePicker v-model="filters.grades" />
      </li>
      <li>
        <em>{{ t('route.fields.zone') }}</em>
        <ZoneSelector
          v-model="filters.zone"
          :zones="options.zones" />
      </li>
      <li v-if="options.elevation">
        <em>{{ t('route.fields.elevation') }}</em>
        <small>{{ filters.elevation }}m</small>
        <input
          v-model="filters.elevation"
          v-bind="options.elevation"
          class="filter-elevation"
          type="range">
      </li>
      <li>
        <em>{{ t('route.fields.orientation') }}</em>
        <OrientationPicker v-model="filters.orientation" />
      </li>
    </TableList>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dropdown, TableList } from '/@/components';
import type { ListRoute, Grade, Orientation } from '/@/types';
import OrientationPicker from './filters/OrientationPicker.vue';
import GradePicker from './filters/GradePicker.vue';
import ZoneSelector from './filters/ZoneSelector.vue';

defineSlots<{
  toggler:(props: { active: number }) => void;
}>();

const props = defineProps<{
  routes: ListRoute[],
}>();

const filters = defineModel<{
  grades: Grade[],
  zone: string[],
  elevation: number,
  orientation: Orientation[],
}>({ required: true });

const roundToUpperHundred = (number: number): number => Math.ceil(number / 100) * 100;

const options = computed(() => {
  const zones = [...new Set(props.routes.map(route => route.zone))].sort();
  const elevations = props.routes.map(route => route.elevation);
  const elevation = elevations.length ? {
    min: roundToUpperHundred(Math.min(...elevations)),
    max: roundToUpperHundred(Math.max(...elevations)),
    step: 100,
  } : undefined;
  return { zones, elevation };
});

watch(options, ({ elevation }) => {
  filters.value.elevation = elevation?.max ?? 0;
}, { immediate: true });

const active = computed(() => (
  Number(!!filters.value.grades.length)
  + Number(!!filters.value.zone.length)
  + Number(+filters.value.elevation !== options.value.elevation?.max)
  + Number(!!filters.value.orientation.length)
));

const clear = () => {
  filters.value.grades = [];
  filters.value.zone = [];
  filters.value.elevation = options.value.elevation?.max ?? 0;
  filters.value.orientation = [];
};

const { t } = useI18n();
</script>
