<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { createMap, useMap } from '/@/composables';
import store from '/@/store';
import config from '/@/config.yaml';

const { addLayer, createLegend } = useMap();

addLayer(config.layers.BORDERS);

onMounted(async () => {
  createMap('map', config.map);
  createLegend(config.map.legend);
  store.loadTerrain();
  store.loadRoutes();
});
</script>
