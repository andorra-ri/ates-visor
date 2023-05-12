<template>
  <div id="map" />
  <Toolbar />
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { Toolbar } from '/@/layouts';
import { createMap, useMap } from '/@/composables';
import store from '/@/store';
import { json } from '/@/utils';
import config from '/@/config.yaml';

const { addLayer, createLegend, fitTo } = useMap();

addLayer(config.layers.BORDERS);

addLayer(computed(() => {
  const source = json.toFeatureCollection(store.state.terrain);
  return { ...config.layers.TERRAIN, source };
}));

addLayer(computed(() => {
  const source = json.toFeatureCollection(store.state.route?.trails || []);
  return { ...config.layers.ROUTE, source };
}));

addLayer(computed(() => {
  const source = json.toFeatureCollection(store.state.waypoints || []);
  return { ...config.layers.WAYPOINTS, source };
}));

watch(() => store.state.route, route => {
  if (route) fitTo(route.trails, { padding: 50 });
});

onMounted(async () => {
  createMap('map', config.map);
  createLegend(config.map.legend);
  store.loadTerrain();
  store.loadRoutes();
});
</script>
