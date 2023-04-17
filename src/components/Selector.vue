<template>
  <Dropdown class="selector">
    <template #toggle>
      <div class="input selector__toggle">
        <slot name="toggle" :item="selected">
          <slot :item="selected">
            {{ selected || props.placeholder }}
          </slot>
        </slot>
        <span v-if="selected && props.clear" class="icon clearer" @click="clear" />
        <span v-else class="icon chevron" />
      </div>
    </template>
    <PickList
      v-model="selected"
      :options="props.options"
      :key-attr="props.keyAttr"
      class="selector__list">
      <template #default="{ item, index }">
        <slot name="option" :item="item" :index="index">
          <slot :item="item">{{ item }}</slot>
        </slot>
      </template>
    </PickList>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Dropdown from './Dropdown.vue';
import PickList from './PickList.vue';

const props = defineProps<{
  modelValue: any;
  options: any[];
  placeholder?: string;
  keyAttr?: string;
  clear?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const selected = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const clear = () => { selected.value = undefined; };
</script>
