<template>
  <div class="toolbar">
    <RouteSelect
      :routes="routes"
      @select="store.selectRoute" />
    <AvalancheNotify />
    <AvalancheRisk :risk="avalancheRisk" />
    <RoutePanel
      v-if="route"
      :route="route" />
  </div>
</template>

<script setup lang="ts">
import { RouteSelect, AvalancheRisk, AvalancheNotify, RoutePanel } from './partials';
import store from '/@/store';

const { routes, route, avalancheRisk } = store;
</script>
