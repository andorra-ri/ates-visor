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
