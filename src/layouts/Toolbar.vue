<template>
  <div class="toolbar">
    <RouteSelect
      :routes="store.state.routes"
      @select="store.selectRoute" />
    <AvalancheRisk :risk="risk" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteSelect, AvalancheRisk } from './partials';
import store from '/@/store';

const risk = ref<number>(2);
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
