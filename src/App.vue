<template>
  <Map />
  <div class="toolbar">
    <RouteSelector
      :routes="routes"
      :block="!!route"
      @select="selectRoute" />
    <AvalancheNotify />
    <AvalancheRisk :risk="avalancheRisk" />
    <RoutePanel
      v-if="route"
      :route="route" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Map, RouteSelector, AvalancheRisk, AvalancheNotify, RoutePanel } from '/@/partials';
import store from '/@/store';

const { routes, route, avalancheRisk, selectRoute } = store;

onMounted(() => {
  store.loadAvalancheRisk();
  store.loadTerrain();
  store.loadRoutes();
});
</script>
