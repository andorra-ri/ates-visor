<template>
  <div class="toolbar">
    <RouteSelect
      :routes="store.state.routes"
      @select="store.selectRoute" />
    <AvalancheNotify />
    <AvalancheRisk :risk="store.state.avalancheRisk" />
    <RoutePanel
      v-if="store.state.route"
      :route="store.state.route" />
  </div>
</template>

<script setup lang="ts">
import { RouteSelect, AvalancheRisk, AvalancheNotify, RoutePanel } from './partials';
import store from '/@/store';
</script>
