<template>
  <Dropdown class="selector">
    <template #toggler>
      <div class="input">
        <slot name="toggler" :item="selected">
          <slot :item="selected">
            <span v-if="selected" class="selected">
              {{ props.formatter?.(selected) || selected }}
            </span>
            <span v-else class="placeholder">{{ props.placeholder }}</span>
          </slot>
        </slot>
        <span v-if="selected && props.clearable" class="icon clearer" @click="clear" />
        <span v-else class="icon chevron" />
      </div>
    </template>
    <div v-if="!props.block" class="selector__panel">
      <slot name="topbar" />
      <ul class="selector__options" :data-empty="props.emptyText">
        <li v-for="option, i in props.options" :key="i">
          <label>
            <input v-model="selected" :value="option" type="radio">
            <slot name="option" :option="option">
              <slot :item="option">
                {{ props.formatter?.(option) || option }}
              </slot>
            </slot>
          </label>
        </li>
      </ul>
    </div>
  </Dropdown>
</template>

<script setup lang="ts" generic="T">
import Dropdown from './Dropdown.vue';

defineSlots<{
  default?:(props: { item: T | undefined }) => void;
  toggler?:(props: { item: T | undefined }) => void;
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

const selected = defineModel<T>();

const clear = () => {
  selected.value = undefined;
};
</script>
