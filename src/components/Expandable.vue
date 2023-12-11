<template>
  <div class="expandable" :open="isExpanded">
    <div class="toggler">
      <slot name="toggler" :open="isExpanded" :toggle="toggle" />
    </div>
    <div class="content">
      <slot v-if="isExpanded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineSlots<{
  toggler:(props: { open: boolean, toggle:() => void }) => void;
  default:() => void;
}>();

const props = defineProps<{
  open?: boolean;
}>();

const isExpanded = ref(props.open ?? true);

watch(() => props.open, open => { isExpanded.value = !!open; });

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>
