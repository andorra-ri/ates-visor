<template>
  <Map />
  <div class="toolbar">
    <RouteSelector
      v-model:open="isOpenSelector"
      :routes="routes"
      @select="selectRoute" />
    <AvalancheNotify />
    <AvalancheRisk :risk="avalancheRisk" />
    <RoutePanel
      v-if="!isOpenSelector && route"
      :route="route" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Map, RouteSelector, AvalancheRisk, AvalancheNotify, RoutePanel } from '/@/partials';
import store from '/@/store';

const { routes, route, avalancheRisk, selectRoute } = store;
const isOpenSelector = ref(false);

onMounted(() => {
  store.loadAvalancheRisk();
  store.loadTerrain();
  store.loadRoutes();
});
</script>
