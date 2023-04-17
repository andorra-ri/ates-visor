<template>
  <div class="toolbar">
    <RouteSelect v-model="route" :routes="store.state.routes" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteSelect } from './partials';
import store from '/@/store';
import type { Route } from '/@/types';

const route = ref<Route>();
</script>

<style lang="scss" scoped>
.toolbar {
  @extend %container-strong;

  position: fixed;
  margin: 0.75rem;
  display: flex;
  align-items: stretch;
  z-index: 1;

  & > * + * { border-left: 1px solid var(--color-border); }
}
</style>
