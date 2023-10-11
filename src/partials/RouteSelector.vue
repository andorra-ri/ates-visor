<template>
  <Selector
    v-model="selected"
    :options="routes"
    :empty-text="t('route.empty')"
    class="route-selector"
    clearable>
    <template #toggle="{ item }">
      <div class="label">
        <em>{{ t('route.label') }}</em>
        {{ item?.name || t('route.select_route') }}
      </div>
    </template>
    <template #topbar>
      <aside class="route-selector__filters">
        <SearchInput v-model="searchFor" :placeholder="t('route.search_for')" />

        <!-- Sorter -->
        <div class="label">
          <em>{{ t('sort') }}</em>
          <Selector
            v-model="sortBy"
            :options="Object.keys(SORTERS)"
            clearable>
            <template #default="{ item }">
              {{ item ? t(`sorter.${item}`) : t('sort_placeholder') }}
            </template>
          </Selector>
        </div>

        <RouteFilters v-model="filters.grades" />
      </aside>
    </template>
    <template #option="{ option }">
      <div class="route-selector__route">
        <span :class="['grade', option.grade]" />
        {{ option.name }}
      </div>
    </template>
  </Selector>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Selector, SearchInput } from '/@/components';
import { useFilters, useSorters, type Sorter } from '/@/composables';
import { normalize } from '/@/utils';
import RouteFilters from './RouteFilters.vue';
import type { ListRoute, Grade } from '/@/types';

defineSlots<{
  selected?:(props: { route: ListRoute | undefined }) => void;
  option?:(props: { route: ListRoute }) => void;
}>();

const props = defineProps<{
  routes: ListRoute[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  select: [code: string | undefined];
}>();

const selected = ref<ListRoute>();
watch(selected, route => emit('select', route?.code));

const { t } = useI18n();

const { sort, sorters } = useSorters<ListRoute>();
const { filter } = useFilters<ListRoute>();

const GRADES: Grade[] = ['SIMPLE', 'CHALLENGING', 'COMPLEX'];
const SORTERS: Record<string, Sorter<ListRoute>> = {
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
</script>

<style lang="scss" scoped>
.route-selector {
  &__filters {
    display: flex;
    border-radius: 0.25rem 0.25rem 0 0;
    border-bottom: 1px solid var(--color-border);
  }

  &__route {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.125rem;
    cursor: pointer;

    :checked + &  {
      background: #f4f4f4;
      box-shadow: 0 0 0 0.125rem #f4f4f4;
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

<style lang="scss">
.route-selector .selector__panel { @extend %container-strong }
</style>
