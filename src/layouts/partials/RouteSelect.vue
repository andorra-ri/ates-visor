<template>
  <Dropdown class="route-select">
    <template #toggle>
      <div class="route-select__toggle label">
        <em>{{ t('route.label') }}</em>
        {{ selected?.name || t('route.select_route') }}
      </div>
    </template>
    <div class="route-select__panel">
      <aside class="route-select__filters">
        <SearchInput v-model="searchFor" :placeholder="t('route.search_for')" />
        <SortInput v-model="sortBy" :sorters="Object.keys(SORTERS)" />
        <RouteFilters v-model="filters.grades" />
      </aside>
      <PickList
        v-model="selected"
        :options="routes"
        :data-empty="t('route.empty')"
        class="route-select__list">
        <template #default="{ item }">
          <div class="route-select__option">
            <span :class="['grade', item.grade]" />
            {{ item.name }} {{ item.distance }} - {{ item.duration }}
          </div>
        </template>
      </PickList>
    </div>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dropdown, PickList, SearchInput, SortInput } from '/@/components';
import { useFilters, useSorters, type Sorter } from '/@/composables';
import { normalize } from '/@/utils';
import RouteFilters from './RouteFilters.vue';
import type { Route, Grade } from '/@/types';

const props = defineProps<{
  routes: Route[];
}>();

const emit = defineEmits<{(event: 'select', code: string | undefined): void;}>();

const { sort, sorters } = useSorters<Route>();
const { filter } = useFilters<Route>();

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];
const SORTERS: Record<string, Sorter<Route>> = {
  name: sorters.ON(route => route.name, sorters.ASC),
  grade: sorters.ON(route => route.grade, sorters.LIST(GRADES)),
  distance: sorters.ON(route => route.distance, sorters.ASC),
  duration: sorters.ON(route => route.duration, sorters.ASC),
};

const searchFor = ref<string>('');
const sortBy = ref<keyof typeof SORTERS>('name');
const filters = reactive<{ grades: Grade[] }>({ grades: [] });

const routes = sort([
  (a, b) => SORTERS[sortBy.value || 'undefined']?.(a, b) || 0,
  (a, b) => a.name.localeCompare(b.name),
], filter([
  route => normalize(route.name).includes(searchFor.value),
  route => !filters.grades.length || filters.grades.includes(route.grade),
], toRef(props, 'routes')));

const selected = ref<Route>();
watch(selected, route => emit('select', route?.code));

const { t } = useI18n();
</script>

<style lang="scss" scoped>
.route-select {
  &__panel {
    @extend %container-strong;

    margin: 0.125rem 0;
  }

  &__toggle {
    width: 17rem;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__filters {
    display: flex;
    border-radius: 0.25rem 0.25rem 0 0;
    border-bottom: 1px solid var(--color-border);
  }

  &__list {
    max-height: 20rem;
    overflow: auto;
    padding: 0.5rem 0;
  }

  &__option {
    padding: 0.75rem 1.25rem;
    display: flex;
    gap: 0.75rem;
    cursor: pointer;

    :checked + &  {
      background: #f4f4f4;
      box-shadow: 0 0 0 0.25rem #f4f4f4;
    }

    .grade {
      display: inline-block;
      flex: 0 0 0.5rem;
      height: 0.5rem;
      width: 0.5rem;
      margin: 0.25rem 0;
      border-radius: 0.125rem;
      background: var(--color);
    }
  }
}
</style>
