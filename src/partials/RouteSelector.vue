<template>
  <Selector
    v-model="selected"
    :options="routes"
    :empty-text="t('route.empty')"
    class="route-selector"
    clearable>
    <template #toggler="{ item }">
      <div class="label">
        <em>{{ t('route.label') }}</em>
        {{ item?.name || t('route.select_route') }}
      </div>
    </template>
    <template #topbar>
      <aside class="route-selector__filters">
        <!-- Searcher -->
        <label class="label">
          <em>{{ t('search') }}</em>
          <div class="input">
            <span class="icon magnifier" />
            <input
              v-model="searchFor"
              :placeholder="t('route.search_for')"
              size="15"
              type="text">
          </div>
        </label>

        <!-- Sorter -->
        <div class="label">
          <em>{{ t('sort') }}</em>
          <Selector
            v-model="sortBy"
            :options="Object.keys(SORTERS)"
            :placeholder="t('select')"
            :formatter="sorter => t(`sorter.${sorter}`)"
            clearable />
        </div>

        <!-- Filters -->
        <div class="label">
          <RouteFilters
            v-model="filters"
            :routes="props.routes"
            right>
            <template #toggler="{ active }">
              <div class="button button--light button--icon">
                <span v-if="active" class="badge">{{ active }}</span>
                <img src="/images/filters.png" class="icon">
              </div>
            </template>
          </RouteFilters>
        </div>
      </aside>
    </template>

    <!-- List of routes -->
    <template #option="{ option }">
      <div class="route-selector__route">
        <span :class="['grade', option.grade]" />
        <span>
          <em class="note">{{ option.zone }}</em>
          {{ option.name }}
        </span>
      </div>
    </template>
  </Selector>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Selector } from '/@/components';
import { useFilters, useSorters, type Sorter } from '/@/composables';
import { normalize } from '/@/utils';
import type { ListRoute, Grade } from '/@/types';
import RouteFilters from './RouteFilters.vue';

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
  elevation: sorters.ON(route => route.elevation, sorters.ASC),
  zone: sorters.ON(route => route.zone, sorters.ASC),
};

const searchFor = ref<string>('');
const searchSeed = computed(() => normalize(searchFor.value));

const sortBy = ref<keyof typeof SORTERS>('name');
const filters = reactive<{
  grades: Grade[],
  zone: string,
}>({
  grades: [],
  zone: '',
});

const routes = sort([
  (a, b) => SORTERS[sortBy.value || 'undefined']?.(a, b) || 0,
  (a, b) => a.name.localeCompare(b.name),
], filter([
  route => normalize(`${route.name} ${route.zone}`).includes(searchSeed.value),
  route => !filters.grades.length || filters.grades.includes(route.grade),
  route => !filters.zone || route.zone.includes(filters.zone),
], toRef(props, 'routes')));
</script>

<style lang="scss" scoped>
.route-selector {
  width: 20rem;

  .toggler {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__filters {
    display: flex;
    align-items: center;
    border-radius: 0.25rem 0.25rem 0 0;
    border-bottom: 1px solid var(--color-border);
  }

  &__route {
    display: flex;
    align-items: center;
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

    em.note {
      display: block;
      font-size: 0.75em;
      opacity: 0.5;
      line-height: 1.25;
    }
  }
}
</style>

<style lang="scss">
.route-selector > .dropdown__panel { @extend %container-strong }
</style>
