<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { createMap, useMap } from '/@/composables';
import store from '/@/store';
import config from '/@/config.yaml';

const { addLayer, createLegend, fitTo, toFeatureCollection } = useMap();

addLayer(config.layers.BORDERS);

addLayer(computed(() => {
  const source = toFeatureCollection(store.state.terrain);
  return { ...config.layers.TERRAIN, source };
}));

addLayer(computed(() => {
  const source = toFeatureCollection(store.state.route?.trails || []);
  return { ...config.layers.ROUTE, source };
}));

addLayer(computed(() => {
  const source = toFeatureCollection(store.state.route?.waypoints || []);
  return { ...config.layers.WAYPOINTS, source };
}));

watch(() => store.state.route, route => {
  if (route) fitTo(route.trails, { padding: 50 });
});

onMounted(() => {
  createMap('map', config.map);
  createLegend(config.map.legend);
});
</script>
