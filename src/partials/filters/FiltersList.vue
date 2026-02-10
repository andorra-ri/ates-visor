<template>
  <Dropdown class="filters">
    <template #toggler>
      <div class="button button--light button--icon">
        <span v-if="activeFilters" class="badge">{{ activeFilters }}</span>
        <img src="/images/filters.png" class="icon">
      </div>
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
        <em class="a">{{ t('route.fields.elevation') }}</em>
        <VueSlider
          v-model="filters.elevation"
          v-bind="options.elevation"
          class="range-filter" />
      </li>
      <li class="item-description">
        <div class="filter-row">
          <em>{{ t('route.fields.orientation') }}</em>
          <OrientationPicker v-model="filters.orientation" />
        </div>
        <p class="description-block">{{t('route.fields.orientation_description') }}</p>
      </li>
    </TableList>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import VueSlider from 'vue-slider-component';
import { Dropdown, TableList } from '/@/components';
import OrientationPicker from './OrientationPicker.vue';
import GradePicker from './GradePicker.vue';
import ZoneSelector from './ZoneSelector.vue';
import type { ListRoute, Grade, Orientation } from '/@/types';

export type RouteFilters = {
  grades: Grade[],
  zone: string[],
  elevation: [number, number],
  orientation: Orientation[],
};

defineSlots<{
  toggler:(props: { active: number }) => void;
}>();

const props = defineProps<{
  routes: ListRoute[],
}>();

const filters = defineModel<RouteFilters>({ required: true });

const options = computed(() => {
  const roundToUpperHundred = (number: number): number => Math.ceil(number / 100) * 100;
  const zones = [...new Set(props.routes.map(route => route.zone))].sort();
  const elevations = props.routes.map(route => route.elevation);
  const elevation = elevations.length ? {
    min: roundToUpperHundred(Math.min(...elevations)),
    max: roundToUpperHundred(Math.max(...elevations)),
    interval: 100,
    'tooltip-formatter': (value: number) => `${value}m`,
  } : undefined;
  return { zones, elevation };
});

watch(options, ({ elevation }) => {
  filters.value.elevation = [elevation?.min ?? 0, elevation?.max ?? 0];
}, { immediate: true });

const activeFilters = computed(() => {
  const { grades, zone, elevation, orientation } = filters.value;
  const { min = -Infinity, max = Infinity } = options.value.elevation || {};
  const gradesSelected = !!grades.length;
  const zoneSelected = !!zone.length;
  const elevationSelected = +(elevation[0] !== min || elevation[1] !== max);
  const orientationSelected = !!orientation.length;
  return +gradesSelected + +zoneSelected + +elevationSelected + +orientationSelected;
});

const clear = () => {
  const { min = 0, max = 0 } = options.value.elevation || {};
  filters.value.grades = [];
  filters.value.zone = [];
  filters.value.elevation = [min, max];
  filters.value.orientation = [];
};

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.filters { margin: 0.75rem; }

.range-filter { flex: 1; }

.item-description {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.description-block {
  font-size: 0.85em;
  opacity: 0.7;
  margin: 0;
}
</style>
