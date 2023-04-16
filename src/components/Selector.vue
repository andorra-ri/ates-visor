<template>
  <Dropdown class="selector">
    <template #toggle>
      <div class="selector__toggle">
        <slot name="toggle" :item="selected">
          <slot :item="selected">
            {{ selected || props.placeholder }}
          </slot>
        </slot>
        <span v-if="selected && props.clear" class="clearer" @click="clear" />
        <span v-else class="chevron" />
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

<style lang="scss" scoped>
.selector {
  &__toggle { display: flex; }

  .chevron,
  .clearer {
    display: block;
    opacity: 0.75;
    height: 1em;
    width: 1em;
    text-align: center;
    border-radius: 50%;
    line-height: 1;
    margin-left: 0.5em;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path></svg>');
    background-position: 50% 50%;
  }

  .clearer {
    cursor: pointer;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>');
  }
}
</style>
