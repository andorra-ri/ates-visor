<template>
  <ul class="pick-list">
    <li
      v-for="option, i in props.options"
      :key="props.keyAttr ? option[props.keyAttr] : option">
      <label class="pick-list__option">
        <input v-model="selected" :value="option" type="radio">
        <slot :item="option" :index="i">{{ option }}</slot>
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: any;
  options: any[];
  keyAttr?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});
</script>

<style lang="scss" scoped>
.pick-list {
  &__option {
    cursor: pointer;
    display: block;

    input { display: none; }
  }
}
</style>
