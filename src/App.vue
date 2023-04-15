<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { createMap, useMap } from '/@/composables';
import store from '/@/store';
import { json } from '/@/utils';
import config from '/@/config.yaml';

const { addLayer, createLegend } = useMap();

addLayer(config.layers.BORDERS);

addLayer(computed(() => {
  const source = json.toFeatureCollection(store.state.terrain);
  return { ...config.layers.TERRAIN, source };
}));

onMounted(async () => {
  createMap('map', config.map);
  createLegend(config.map.legend);
  store.loadTerrain();
  store.loadRoutes();
});
</script>
