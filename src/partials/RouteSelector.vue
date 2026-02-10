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
        <FiltersList
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
import { ref, computed, reactive, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';
import { useTrailsMapper, useFilters, useSorters, type Sorter } from '/@/composables';
import { normalize } from '/@/utils';
import type { ListRoute, Grade, Orientation } from '/@/types';
import SearchBox from './filters/SearchBox.vue';
import SortSelector from './filters/SortSelector.vue';
import FiltersList, { type RouteFilters } from './filters/FiltersList.vue';
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
const allOrientation: Orientation[] = ['N','NE','E','SE','S','SO','O','NO']
const filters = reactive<RouteFilters>({
  grades: [],
  zone: [],
  elevation: [0, 0],
  orientation: allOrientation,
});

const routes = sort([
  (a, b) => SORTERS[sortBy.value || 'undefined']?.(a, b) || 0,
  (a, b) => a.name.localeCompare(b.name),
], filter([
  route => normalize(`${route.name} ${route.zone}`).includes(searchFor.value),
  route => !filters.grades.length || filters.grades.includes(route.grade),
  route => !filters.zone.length || filters.zone.some(zone => route.zone.includes(zone)),
  route => route.elevation >= filters.elevation[0] && route.elevation <= filters.elevation[1],
  route => route.orientation.some(o => filters.orientation.includes(o)) &&
    !route.orientation.some(o => !filters.orientation.includes(o) && allOrientation.includes(o))
 
], toRef(props, 'routes')));

const trails = computed(() => (selected.value ? [] : routes.value.flatMap(route => route.trails)));
const { clicked } = useTrailsMapper(trails);
watch(clicked, routeCode => {
  if (routeCode) selected.value = props.routes.find(route => route.code === routeCode);
});
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
