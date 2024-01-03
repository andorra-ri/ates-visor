<template>
  <Map />
  <div class="toolbar">
    <a href="https://www.ari.ad" target="blank">
      <img
        src="/images/logo_ari.png"
        alt="Andorra Recerca + Innovació"
        class="brand">
    </a>
    <RouteSelector
      v-model="selected"
      :routes="routes"
      :block="!!route" />
    <AvalancheNotify />
    <AvalancheRisk :risk="avalancheRisk" />
    <RoutePanel
      v-if="route"
      :route="route"
      @close="selected = undefined" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { Map, RouteSelector, AvalancheRisk, AvalancheNotify, RoutePanel } from '/@/partials';
import store from '/@/store';
import type { ListRoute } from '/@/types';

const { routes, route, avalancheRisk, selectRoute } = store;

const selected = ref<ListRoute>();
watch(selected, selectRoute);

onMounted(() => {
  store.loadAvalancheRisk();
  store.loadTerrain();
  store.loadRoutes();
});
</script>
