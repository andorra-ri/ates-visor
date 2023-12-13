<template>
  <Selector
    v-model="selected"
    :options="routes"
    :empty-text="t('route.empty')"
    clearable>
    <template #toggler="{ item }">
      <div class="label">
        <em>{{ t('route.label') }}</em>
        {{ (item as ListRoute)?.name || t('route.select_route') }}
      </div>
    </template>
    <template #topbar>
      <aside class="topbar">
        <SearchBox v-model="searchFor" />
        <SortSelector
          v-model="sortBy"
          :sorters="SORTERS" />
        <RouteFilters
          v-model="filters"
          :routes="props.routes"
          right />
      </aside>
    </template>
    <template #option="{ option }">
      <RouteListItem :route="option" />
    </template>
  </Selector>
</template>

<script setup lang="ts">
import { ref, computed, reactive, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';
import { useTrailsMapper, useFilters, useSorters, type Sorter } from '/@/composables';
import { normalize } from '/@/utils';
import type { ListRoute, Grade, Orientation } from '/@/types';
import SearchBox from './filters/SearchBox.vue';
import SortSelector from './filters/SortSelector.vue';
import RouteFilters from './filters/RouteFilters.vue';
import RouteListItem from './RouteListItem.vue';

defineSlots<{
  selected?:(props: { route: ListRoute | undefined }) => void;
  option?:(props: { route: ListRoute }) => void;
}>();

const props = defineProps<{
  routes: ListRoute[];
  placeholder?: string;
}>();

const selected = defineModel<ListRoute | undefined>({ required: true });

const { t } = useI18n();

const { sort, sorters } = useSorters<ListRoute>();
const { filter } = useFilters<ListRoute>();

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];
const SORTERS: Record<string, Sorter<ListRoute>> = {
  name: sorters.ON(route => route.name, sorters.ASC),
  grade: sorters.ON(route => route.grade, sorters.LIST(GRADES)),
  distance: sorters.ON(route => route.distance, sorters.ASC),
  duration: sorters.ON(route => route.duration, sorters.ASC),
  elevation: sorters.ON(route => route.elevation, sorters.ASC),
  zone: sorters.ON(route => route.zone, sorters.ASC),
};

const searchFor = ref<string>('');
const sortBy = ref<keyof typeof SORTERS>('name');
const filters = reactive<{
  grades: Grade[],
  zone: string[],
  elevation: number,
  orientation: Orientation[],
}>({
  grades: [],
  zone: [],
  elevation: 0,
  orientation: [],
});

const routes = sort([
  (a, b) => SORTERS[sortBy.value || 'undefined']?.(a, b) || 0,
  (a, b) => a.name.localeCompare(b.name),
], filter([
  route => normalize(`${route.name} ${route.zone}`).includes(searchFor.value),
  route => !filters.grades.length || filters.grades.includes(route.grade),
  route => !filters.zone.length || filters.zone.some(zone => route.zone.includes(zone)),
  route => !filters.elevation || route.elevation <= filters.elevation,
  route => !filters.orientation.length
    || filters.orientation.some(o => route.orientation.includes(o)),
], toRef(props, 'routes')));

const trails = computed(() => (selected.value ? [] : routes.value.flatMap(route => route.trails)));
useTrailsMapper(trails);
</script>

<style lang="scss" scoped>
.selector {
  width: 20rem;

  .toggler {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.topbar {
  display: flex;
  align-items: center;
  border-radius: 0.25rem 0.25rem 0 0;
  border-bottom: 1px solid var(--color-border);
}
</style>
