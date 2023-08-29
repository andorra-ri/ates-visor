<template>
  <div class="toolbar">
    <RouteSelect
      :routes="store.state.routes"
      @select="store.selectRoute" />
    <AvalancheRisk :risk="store.state.avalancheRisk" />
  </div>
</template>

<script setup lang="ts">
import { RouteSelect, AvalancheRisk } from './partials';
import store from '/@/store';
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
