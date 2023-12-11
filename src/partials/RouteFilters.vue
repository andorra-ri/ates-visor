<template>
  <Dropdown>
    <template #toggler>
      <slot name="toggler" :active="active" />
    </template>
    <ul class="popover filters">
      <li><h3>{{ t('route.filters') }}</h3></li>
      <li>
        <em>{{ t('route.fields.grade') }}</em>
        <fieldset class="filter-grade">
          <label v-for="grade in GRADES" :key="grade">
            <input
              v-model="filters.grades"
              :value="grade"
              :class="['filter-grade__input', grade]"
              type="checkbox">
          </label>
        </fieldset>
      </li>
      <li>
        <em>{{ t('route.fields.zone') }}</em>
        <Selector
          v-model="filters.zone"
          :options="options.zones"
          :placeholder="t('select', [t('route.fields.zone')])"
          class="filter-zone"
          clearable />
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
    </ul>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dropdown, Selector } from '/@/components';
import type { ListRoute, Grade } from '/@/types';

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];

defineSlots<{
  toggler:(props: { active: number }) => void;
}>();

const props = defineProps<{
  routes: ListRoute[],
}>();

const filters = defineModel<{
  grades: Grade[],
  zone: string,
  elevation: number,
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
  + Number(!!filters.value.zone)
  + Number(+filters.value.elevation !== options.value.elevation?.max)
));

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.filters {
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;

    em {
      flex: 1;
      color: #888;
    }

    & + li { border-top: 1px solid #8882; }

    small { opacity: 0.5; }
  }
}

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
    transform: scale(0.75);
    opacity: 0.75;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover { opacity: 1; }

    &:checked {
      transform: none;
      opacity: 1;
    }
  }
}

.filter-zone { min-width: 11rem; }
</style>
