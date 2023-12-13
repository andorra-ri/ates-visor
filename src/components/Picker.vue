<template>
  <fieldset class="picker">
    <legend>
      <slot name="legend">{{ props.label }}</slot>
    </legend>
    <label v-for="option in props.options" :key="String(option)" class="picker__option">
      <input v-model="picked" :value="option" :type="type">
      <slot name="option" :option="option">{{ option }}</slot>
    </label>
  </fieldset>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';

defineSlots<{
  option:(props: { option: T }) => void;
  legend:() => void;
}>();

const props = defineProps<{
  options: T[];
  label?: string;
}>();

const picked = defineModel<T | T[] | undefined>({ required: true });

const type = computed(() => (Array.isArray(picked.value) ? 'checkbox' : 'radio'));
</script>

<style lang="scss" scoped>
.picker {
  &__option {
    display: inline-block;

    & > input[type="checkbox"],
    & > input[type="radio"] { display: none; }
  }
}
</style>
