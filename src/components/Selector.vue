<template>
  <Dropdown class="selector">
    <template #toggler>
      <div class="input">
        <slot name="toggler" :item="selected">
          <slot :item="selected">
            <span v-if="isSelected(selected)">{{ toLabel(selected) }}</span>
            <span v-else class="selector__placeholder">{{ props.placeholder }}</span>
          </slot>
        </slot>
        <span
          v-if="isSelected(selected) && props.clearable"
          class="icon clearer"
          @click="clear" />
        <span v-else class="icon chevron" />
      </div>
    </template>
    <div v-if="!props.block" class="selector__panel">
      <slot name="topbar" />
      <ul class="selector__options" :data-empty="props.emptyText">
        <li v-for="option, i in props.options" :key="i">
          <label>
            <input v-model="selected" :value="option" :type="type">
            <slot name="option" :option="option">
              <slot :item="option">
                <div class="selector__option">
                  {{ props.formatter?.(option) || option }}
                </div>
              </slot>
            </slot>
          </label>
        </li>
      </ul>
    </div>
  </Dropdown>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
import Dropdown from './Dropdown.vue';

defineSlots<{
  default?:(props: { item: T | T[] | undefined }) => void;
  toggler?:(props: { item: T | T[] | undefined }) => void;
  topbar?:() => void;
  option?:(props: { option: T }) => void;
}>();

const props = defineProps<{
  options: T[];
  formatter?:(item: T) => string;
  placeholder?: string;
  clearable?: boolean;
  emptyText?: string;
  block?: boolean;
}>();

const selected = defineModel<T | T[] | undefined>();

const type = computed(() => (Array.isArray(selected.value) ? 'checkbox' : 'radio'));

const isSelected = (value: T | T[] | undefined): value is T | T[] => (
  Array.isArray(value) ? value.length > 0 : value !== undefined
);

const toLabel = (value: T | T[]) => (
  Array.isArray(value)
    ? value.map(item => props.formatter?.(item) || item).join(', ')
    : props.formatter?.(value) || selected
);

const clear = () => {
  selected.value = Array.isArray(selected.value) ? [] : undefined;
};
</script>

<style lang="scss" scoped>
.selector {
  input { display: none; }

  .icon { margin-left: auto; }

  &__placeholder {
    opacity: 0.25;
    white-space: nowrap;
  }

  &__options {
    max-height: 20rem;
    overflow: auto;
    padding: 0.5rem;
  }

  &__option {
    margin: 1px 0;
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover { background: #8882; }

    :checked + & {
      background: var(--color-primary);
      color: #fff;
    }
  }
}
</style>
