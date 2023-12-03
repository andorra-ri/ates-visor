<template>
  <Dropdown>
    <template #toggle>
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
          :options="zones"
          :placeholder="t('select', [t('route.fields.zone')])"
          class="filter-zone"
          clearable />
      </li>
    </ul>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
}>({ required: true });

const zones = computed(() => [...new Set(props.routes.map(route => route.zone))].sort());

const active = computed(() => Number(!!filters.value.grades.length) + Number(!!filters.value.zone));

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

.filter-zone { min-width: 10rem; }
</style>
